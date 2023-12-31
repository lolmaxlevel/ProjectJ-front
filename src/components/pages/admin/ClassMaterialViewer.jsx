import {Button, Form, Input, Popconfirm, Table} from 'antd';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ApplicationService} from "../../../service/ApplicationService.js";
import styles from './admin.module.css';
import SchoolMaterialForm from "../../ui/SchoolMaterialForm.jsx";

// #TODO: move to separate file and refactor
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
// #TODO: add ability to edit grades and type
const ClassMaterialViewer = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const result = await ApplicationService.getSchoolMaterials();
                const translatedMaterials = result.map((material) => ({
                    ...material,
                    key: material.id,
                    grade: translateGradeToRussian(material.grade),
                    type: translateTypeToRussian(material.type),
                }));
                setMaterials(translatedMaterials);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchMaterials();
    }, []);

    const deleteMaterial = (key) => {
        ApplicationService.deleteSchoolMaterial(key)
            .then(() => {
                const updatedMaterials = materials.filter((material) => material.key !== key);
                setMaterials(updatedMaterials);
            })
            .catch((error) => console.log(error));
    };

    const addMaterial = (id, name, link, grade, type) => {
        const newMaterial = {
            id,
            key: id,
            name,
            link,
            grade: translateGradeToRussian(grade),
            type: translateTypeToRussian(type),
        };
        setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
    };

    const handleSave = (updatedMaterial) => {
        ApplicationService.updateSchoolMaterial(
            updatedMaterial.id,
            updatedMaterial.name,
            updatedMaterial.link,
            updatedMaterial.grade,
            updatedMaterial.type)
            .then(() => {
                const updatedMaterials = materials.map((material) => {
                    if (material.key === updatedMaterial.key) {
                        return {
                            ...material,
                            ...updatedMaterial,
                        };
                    }
                    return material;
                });
                setMaterials(updatedMaterials);
            })
            .catch((error) => console.log(error));
    };

    const translateTypeToRussian = (type) => {
        switch (type) {
            case "Homework":
                return "ДЗ";
            case "Test":
                return "КР";
            case "Other":
                return "Другое";
            default:
                return type;
        }
    };

    const translateGradeToRussian = (grade) => {
        return grade.replace("L", "Л");
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            width: "30%",
            editable: true,
        },
        {
            title: "Link",
            dataIndex: "link",
            width: "30%",
            editable: true,
            render: (text) => <a href={text}>{text}</a>,
        },
        {
            title: "Grade",
            dataIndex: "grade",
            filters: [
                {text: "5-6", value: "5-6"},
                {text: "7А", value: "7A"},
                {text: "7Л", value: "7Л"},
                {text: "8А", value: "8A"},
                {text: "8Л", value: "8Л"},
                {text: "9А", value: "9A"},
                {text: "9Л", value: "9Л"},
                {text: "10", value: "10"},
                {text: "11", value: "11"},
            ],
            width: "10%",
            onFilter: (value, record) => record.grade.indexOf(value) === 0,
            sorter: (a, b) => a.grade.localeCompare(b.grade),
        },
        {
            title: "Type",
            dataIndex: "type",
            filters: [
                {text: "ДЗ", value: "ДЗ"},
                {text: "КР", value: "КР"},
                {text: "Другое", value: "Другое"},
            ],
            width: "20%",
            onFilter: (value, record) => record.type.indexOf(value) === 0,
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: "Delete",
            dataIndex: "operation",
            render: (_, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => deleteMaterial(record.key)}>
                    <Button type="primary" danger>
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const editableColumns = columns.map((column) => {
        if (!column.editable) {
            return column;
        }
        return {
            ...column,
            onCell: (record) => ({
                record,
                editable: column.editable,
                dataIndex: column.dataIndex,
                title: column.title,
                handleSave: handleSave,
            }),
        };
    });

    return (
        <div className={styles.table}>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={materials}
                columns={editableColumns}
                loading={loading}
            />
            <div className={styles.uploadBlock}>
                <SchoolMaterialForm handleAdd={addMaterial}/>
            </div>
        </div>
    );
};
export default ClassMaterialViewer;
