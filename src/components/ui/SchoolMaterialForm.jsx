import {Button, Form, Input, message, Select, Space,} from 'antd';
import {ApplicationService} from "../../service/ApplicationService.js";


const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

function UploadForm({handleAdd}) {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (!isLinkValid(values["input-link"])) {
                message.error("Link is not valid");
                return;
            }
            const response = await ApplicationService.addSchoolMaterial(
                values["input-name"],
                values["input-link"],
                values["select-class"],
                values["select-type"]
            );
            handleAdd(
                response.data.id,
                response.data.name,
                response.data.link,
                response.data.grade,
                response.data.type
            );
        } catch (error) {
            message.error(error.message);
        }
    };

    function isLinkValid(link) {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(link);
    }

    return (
        <Form
            form={form}
            name="validate_other"
            {...formItemLayout}
            initialValues={{
                "select-class": "5-6",
                "select-type": "Homework",
            }}
        >
            <Form.Item label="Name">
                <Form.Item
                    name="input-name"
                    rules={[
                        {
                            required: true,
                            message: "Please input file name!",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form.Item>
            <Form.Item label="Link">
                <Form.Item
                    name="input-link"
                    rules={[
                        {
                            required: true,
                            message: "Please input link!",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form.Item>

            <Form.Item label="Class" name={"select-class"}>
                <Select
                    style={{
                        width: 120,
                    }}
                    options={[
                        {value: "5-6", label: "5-6"},
                        {value: "7A", label: "7A"},
                        {value: "7L", label: "7Л"},
                        {value: "8A", label: "8A"},
                        {value: "8L", label: "8Л"},
                        {value: "9A", label: "9A"},
                        {value: "9L", label: "9Л"},
                        {value: "10", label: "10"},
                        {value: "11", label: "11"},
                    ]}
                />
            </Form.Item>
            <Form.Item label="Type" name={"select-type"}>
                <Select
                    style={{
                        width: 120,
                    }}
                    options={[
                        {value: "Homework", label: "ДЗ"},
                        {value: "Test", label: "Контрольная"},
                        {value: "Other", label: "Другое"},
                    ]}
                />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    span: 12,
                    offset: 6,
                }}
            >
                <Space>
                    <Button type="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button htmlType="reset">reset</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default UploadForm;