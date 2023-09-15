import {Footer} from "../../ui/footer/Footer.jsx";
import styles from './classPage.module.css'
import MainHeader from "../../ui/header/MainHeader.jsx";
import {Card, ConfigProvider} from "antd";
import {useEffect, useState} from "react";
import {ApplicationService} from "../../../service/ApplicationService.js";

function ClassPage() {

    const currentClass = window.location.href.split("/").pop();

    const [homework, setHomework] = useState([])
    const [tests, setTests] = useState([])
    const [other, setOther] = useState([])

    useEffect(() => {
        ApplicationService.getSchoolMaterials().then((response) => {
            let materialsByGrade = response.filter(material => material.grade.toLowerCase() === currentClass)
            setHomework(materialsByGrade.filter(material => material.type === "Homework"))
            setTests(materialsByGrade.filter(material => material.type === "Test"))
            setOther(materialsByGrade.filter(material => material.type === "Other"))
            console.log(response);
        })
    }, []);

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
                                {homework.length > 0
                                    ?
                                    homework.map((material) => {
                                        return (
                                            <li key={material.id} className={styles.link}>
                                                <p onClick={() => open(material.link)}>{material.name}</p>
                                            </li>)
                                    })
                                    :
                                    <div>
                                        <h2>УРА!!!!! ДОМАШКИ НЕТ</h2>
                                        <img src="https://media.tenor.com/UI_9UbBPM94AAAAi/cat-dance.gif" alt=""
                                             height={"200px"}/>
                                    </div>
                                }
                            </ul>
                        </Card>
                        <Card
                            hoverable
                            style={{width: 300}}
                            cover={<img alt="example" height={300} style={{borderRadius: "20px"}}
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                        >
                            <h2 className={styles.cardTitle}>Тесты</h2>
                            <ul className={styles.links}>

                                {tests.length > 0
                                    ?
                                    tests.map((material) => {
                                        return (
                                            <li key={material.id} className={styles.link}>
                                                <p onClick={() => open(material.link)}>{material.name}</p>
                                            </li>
                                        )
                                    })
                                    :
                                    <div>
                                        <h2>УРА!!!!! ТЕСТОВ НЕТ</h2>
                                        <img src="https://media.tenor.com/UI_9UbBPM94AAAAi/cat-dance.gif" alt=""
                                             height={"200px"}/>
                                    </div>
                                }

                            </ul>
                        </Card>
                        <Card
                            hoverable
                            style={{width: 300}}
                            cover={<img alt="example" height={300} style={{borderRadius: "20px"}}
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                        >
                            <h2 className={styles.cardTitle}>Другое</h2>
                            <ul className={styles.links}>
                                {
                                    other.length > 0
                                        ?
                                        other.map((material) => {
                                            return (
                                                <li key={material.id} className={styles.link}>
                                                    <p onClick={() => open(material.link)}>{material.name}</p>
                                                </li>
                                            )
                                        })
                                        :
                                        <div>
                                            <h2>УРА!!!!! ДРУГОГО НЕТ</h2>
                                            <img src="https://media.tenor.com/UI_9UbBPM94AAAAi/cat-dance.gif" alt=""
                                                 height={"200px"}/>
                                        </div>
                                }
                            </ul>
                        </Card>
                    </ConfigProvider>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


export default ClassPage
