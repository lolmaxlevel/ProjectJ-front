import {Footer} from "../../ui/footer/Footer.jsx";
import styles from './classPage.module.css'
import MainHeader from "../../ui/header/MainHeader.jsx";
import {Card, ConfigProvider} from "antd";

function ClassPage() {

    const currentClass = window.location.href.split("/").pop();

    let links = ["school", "explore", "teaching", "achievements"];
    return (
        <div>
            <MainHeader/>
            <div className={styles.container}>
                <div className={styles.card_grid}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Card: {

                                    colorBgContainer: "transparent",
                                    colorBorderSecondary: "transparent",
                                },
                            }
                        }
                        }>
                        <Card

                            style={{width: 300}}
                            cover={<img alt="example" height={300} style={{borderRadius: "20px"}}
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                        >
                            <h2 className={styles.cardTitle}>Домашка</h2>
                            <ul className={styles.links}>
                                {links.map((link, index) => {
                                    return (
                                        <li className={styles.link} key={index}>
                                            {link} {index}
                                        </li>
                                    )
                                })}
                            </ul>
                        </Card>
                        <Card
                            hoverable
                            style={{width: 300}}
                            cover={<img alt="example" height={300} style={{borderRadius: "20px"}}
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                        >
                            <h1>КР</h1>
                            <p>aboba</p>
                        </Card>
                        <Card
                            hoverable
                            style={{width: 300}}
                            cover={<img alt="example" height={300} style={{borderRadius: "20px"}}
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                        >
                            <h1>Еще что то</h1>
                            <p>aboba</p>
                        </Card>
                    </ConfigProvider>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


export default ClassPage
