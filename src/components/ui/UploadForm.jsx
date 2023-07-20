import {InboxOutlined} from '@ant-design/icons';
import {Button, Form, Input, message, Space,} from 'antd';
import {useEffect, useState} from "react";
import {ApplicationService} from "../../service/ApplicationService.js";
import Dragger from "antd/es/upload/Dragger";


const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

// eslint-disable-next-line react/prop-types
function UploadForm({handleAdd}) {
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [canUpload, setCanUpload] = useState(false);

    const values = Form.useWatch([], form);
    useEffect(() => {
        form.validateFields({validateOnly: true,})
            .then(
                () => {
                    fileList.length > 0 && setCanUpload(true);
                },
                () => {
                    setCanUpload(false);
                },
            );
    }, [values, fileList, form]);

    const handleSubmit = () => {
        setUploading(true);
        fileList.length > 0 &&
        ApplicationService.uploadFile(fileList[0],
            form.getFieldValue("input-name"), form.getFieldValue("input-description")).
        then((response) => {
            form.resetFields();
            setFileList([]);
            message.success('upload successfully.');
            handleAdd(response.data.id, response.data.name, response.data.description);
        }).catch(() => {
            message.error('upload failed.');
            setUploading(false)
            setFileList([])
        });
    }

    const props = {
        name: 'file',
        beforeUpload: (new_file) => {
            if (form.getFieldValue("input-name") === undefined || form.getFieldValue("input-name") === "") {
                form.setFieldValue("input-name", new_file.name.split(".").slice(0, -1).join("."));
            }
            setFileList([new_file]);
            return false;
        },
        maxCount: 1,
        multiple: false,
        onRemove: () => setFileList([]),
        accept: ".pdf",
        fileList,
    };
    return <Form form={form}
                 name="validate_other"
                 {...formItemLayout}
                 >
        <Form.Item label="Name">
            <Form.Item name="input-name" rules={[
                {
                    required: true,
                    message: 'Please input file name!',
                },
            ]}>
                <Input/>
            </Form.Item>
        </Form.Item>
        <Form.Item label="Description">
            <Form.Item name="input-description" rules={[
                {
                    required: true,
                    message: 'Please input description!',
                },
            ]}>
                <Input/>
            </Form.Item>
        </Form.Item>

        <Form.Item label="Dragger">
            <Dragger {...props} >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Dragger>
        </Form.Item>

        <Form.Item
            wrapperCol={{
                span: 12,
                offset: 6,
            }}
        >
            <Space>
                <Button type="primary" onClick={handleSubmit} loading={uploading} disabled={!canUpload}>
                    Submit
                </Button>
                <Button htmlType="reset" onClick={() => setFileList([])}>reset</Button>
            </Space>
        </Form.Item>
    </Form>
}

export default UploadForm;