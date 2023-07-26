import {Button, Form, Input, Popconfirm, Table} from 'antd';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ApplicationService} from "../../../service/ApplicationService.js";
import styles from './admin.module.css';
import UploadForm from "../../ui/UploadForm.jsx";


const EditableContext = React.createContext(null);
const EditableRow = ({...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {

    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            if (record[dataIndex] === values[dataIndex]) {
                return;
            }
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}>
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};
const FilesViewer = () => {

    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(dataSource.length);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await ApplicationService.getAchievements();
            result.forEach((item) => {
                item.key = item.id;
            });
            setDataSource([
                ...result,
            ]);
        };
        fetchData().then(() => setLoading(false));
    }, []);

    // Delete file from table and server
    const handleDelete = (key) => {
        ApplicationService.deleteFile(key).then(() => console.log("deleted")).catch((e) => console.log(e))
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    // Download file from server
    const handleDownload = (key) => {
        dataSource.forEach((item) => {
            if (item.key === key) {
                ApplicationService.downloadFile(item.id, item.name).then(() => {})
            }
        })
    }

    // Little hack to add new file to table without server request
    const handleAdd = (id, name, description) => {
        const newData = {
            id: id,
            key: id,
            name: name,
            description: description,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    // Update file on server and table
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        ApplicationService.updateFile(row.id, row.name, row.description)
            .then(() => console.log("updated"))
            .catch((e) => console.log(e))
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const defaultColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: '50%',
            editable: true,
        },
        {
            title: 'Download',
            dataIndex: 'operation',
            render: (_, record) =>
                <Button type="primary" className={styles.BgGreen}
                        onClick={() => handleDownload(record.key)}> Download </Button>
        },
        {
            title: 'Delete',
            dataIndex: 'operation',
            render: (_, record) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <Button type="primary" danger> Delete </Button>
                </Popconfirm>
        },

    ];

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (

        <div className={styles.table}>

            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                loading={loading}

            />
            <div className={styles.uploadBlock}>
                <UploadForm handleAdd={handleAdd}/>
            </div>
        </div>
    );
};
export default FilesViewer;
