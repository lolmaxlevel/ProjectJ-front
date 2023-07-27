import {Button, Layout, Menu,} from 'antd';
import styles from './admin.module.css'
import {ApplicationService} from "../../../service/ApplicationService.js";
import {useNavigate} from "react-router-dom";

const {Header} = Layout;

function AdminHeader({callback}) {
    const navigate = useNavigate();
    const handleLogout = () => {
        ApplicationService.logout().then(() => {
            navigate('/login')
        }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <Header className={styles.header}>
            <div className={styles.headerText}> супер админка)</div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={new Array(3).fill(null).map((_, index) => ({
                    key: String(index + 1),
                    label: `nav ${index + 1}`,
                }))}
                onClick={(e) => callback(e.key)}
                triggerSubMenuAction="hover"
                style={{lineHeight: '64px'}}
            />
            <Button onClick={
                handleLogout
            }>logout</Button>
        </Header>
    )

}

export default AdminHeader
