import {ApplicationService} from "../../../service/ApplicationService.js";

import {Button, Form, Input, message} from 'antd';
import {useNavigate} from "react-router-dom";
import {JwtManager} from "../../../service/JwtService.js";


function Login() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        ApplicationService.login(values.username, values.password).then(() => {
                navigate("/admin");
            }
        ).catch(() => {
            message.error("Неверный логин или пароль").then(() => {
            });
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        JwtManager.userIsLoggedIn()
            ?
            navigate("/admin")
            :
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
    );
}

export default Login;
