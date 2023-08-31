import {useNavigate} from 'react-router-dom';
import styles from './header.module.css';
import {useAnimate, useInView} from "framer-motion";
import {useEffect} from "react";
import {ConfigProvider, Dropdown} from "antd";
import {useMediaQuery} from "react-responsive";


function MainHeader() {

    const navigate = useNavigate();

    const [scope] = useAnimate()
    const [scope2, animate2] = useAnimate()
    const isInView = useInView(scope)

    let links = ["school", "explore", "teaching", "achievements"]
    let names = ["School", "Explore", "Teaching", "Achievements"]

    let fullLink = window.location.href.split("/")
    let currentLink = fullLink[fullLink.length - 1]

    const isDesktop = useMediaQuery({
        query: "(min-width: 1024px)"
    });

    const items =
        links.map((link, index) => {
            if (link !== currentLink) {
                return (
                    {
                        label: <h3 onClick={() => navigate("/" + link)}>{names[index]}</h3>,
                        key: index,
                    }
                )
            }
        })


    useEffect(() => {
        if (isInView) {
            animate2(scope2.current, {opacity: 0}, {duration: 1})
        } else {
            animate2(scope2.current, {opacity: 1}, {duration: 0.5})
        }
    }, [animate2, isInView, scope2])

    return (
        <div>
            <header className={styles.main} ref={scope}>
                <div className={styles.logoContainer}>
                    <h1 onClick={() => navigate("/")} className={styles.arrow}>➤</h1>
                    <img src={"logo/main_logo_5.svg"} draggable={false} alt="logo"
                         onClick={() => navigate("/")}
                         className={styles.logo}/>
                </div>
                {!isDesktop && <div>
                    <ConfigProvider theme={
                        {
                            components: {
                                Dropdown:{
                                        colorBgElevated: "#111111",
                                    colorText: "#f1e1ef",
                                },
                            token: {
                                fontFamily: `"Inter", sans-serif`,
                                fontSize:"14px"
                            }
                        }
                    }}>
                        <Dropdown
                            placement={"bottom"}
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                        >
                            <img src={"/menus.png"} draggable={false} alt="menu"
                                 style={{width: "50px", height: "50px", cursor: "pointer"}}
                            />
                        </Dropdown>
                    </ConfigProvider>
                </div>}

                {isDesktop && <div className={styles.linksContainer}>
                    {links.map((link, index) => {
                        return (
                            <h1 onClick={() => navigate("/" + link)} className={styles.links} key={index}
                                hidden={currentLink === link}>{names[index]}</h1>
                        )
                    })}
                </div>}
                <h1 onClick={() => navigate("/")} className={styles.arrow}
                    style={{position: "fixed", top: 0, color: "#2b2b2b", zIndex: "101"}} ref={scope2}
                    hidden={isInView}>➤</h1>
            </header>
        </div>
    );
}


export default MainHeader;