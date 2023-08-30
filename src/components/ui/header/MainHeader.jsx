import {useNavigate} from 'react-router-dom';
import styles from './header.module.css';
import {useAnimate, useInView} from "framer-motion";
import {useEffect} from "react";


function MainHeader() {
    //#TODO убрать лишние ссылки
    const navigate = useNavigate();

    const [scope] = useAnimate()
    const [scope2, animate2] = useAnimate()
    const isInView = useInView(scope)

    let links = ["school", "explore", "teaching", "achievements"]
    let names = ["School", "Explore", "Teaching", "Achievements"]

    let fullLink = window.location.href.split("/")
    let currentLink = fullLink[fullLink.length - 1]



    useEffect(() => {
        if (isInView) {
            animate2(scope2.current, {opacity: 0}, {duration: 1})
        } else {
            animate2(scope2.current, {opacity: 1}, {duration: 0.5})
        }
    }, [isInView])

    return (
        <div>
            <header className={styles.main} ref={scope}>
                <div className={styles.logoContainer}>
                    <h1 onClick={() => navigate(-1)} className={styles.arrow}>➤</h1>
                    <img src={"logo/main_logo_5.svg"} draggable={false} alt="logo"
                         onClick={() => navigate("/")}
                         className={styles.logo}/>
                </div>
                <div className={styles.linksContainer}>
                    {links.map((link, index) => {
                        return (
                            <h1 onClick={() => navigate("/" + link)} className={styles.links} key={index}
                               hidden={currentLink===link}>{names[index]}</h1>
                        )
                    })}
                </div>
                <h1 onClick={() => navigate(-1)} className={styles.arrow}
                    style={{position: "fixed", top: 0, color: "#2b2b2b"}} ref={scope2} hidden={isInView}>➤</h1>
            </header>
        </div>
    );
}


export default MainHeader;