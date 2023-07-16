import {Layout, Menu,} from 'antd';
import styles from './admin.module.css'
const { Header} = Layout;

function AdminHeader({callback}) {

return (
    <Header className={styles.header}>
        <div className={styles.headerText}> супер админка) </div>
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
          style={{ lineHeight: '64px' }}
        />
      </Header>
)

}

export default AdminHeader
