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

    const saveMaterial = (updatedMaterial) => {
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
            width: "10%",
        },
        {
            title: "Type",
            dataIndex: "type",
            width: "20%",
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
            onCell: (material) => ({
                material,
                editable: column.editable,
                dataIndex: column.dataIndex,
                title: column.title,
                handleSave: saveMaterial,
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
