import styles from './first_block.module.css'
import {useAnimate, useInView} from "framer-motion";
import {useEffect} from "react";
import {animate} from "framer-motion"
import {useNavigate} from "react-router-dom";
import AnimatedLogo from "./AnimatedLogo.jsx";

function FirstBlockContent() {
    const [first_scope] = useAnimate()
    const isInView = useInView(first_scope)
    const navigate = useNavigate()

    useEffect(() => {
        if (isInView) {
            animate(first_scope.current, {opacity: 1, y: 0}, {type: "spring"})
        } else {
            animate(first_scope.current, {opacity: 0, y: -100}, {duration: 1})
        }
    }, [first_scope, isInView])

    return (
        <div className={styles.content} ref={first_scope}>
            <p className={styles.juliaSSchool} onClick={() => navigate("/school")}>Julia’s School</p>
            {/*<AnimatedText text={"HELLO"}/>*/}
            <p className={styles.explore}>Explore</p>
            <p className={styles.teaching}>Teaching</p>
            <p className={styles.achievements} onClick={() => navigate("/achievements")}>Achievements</p>
            <AnimatedLogo/>
        </div>
    )
}

export default FirstBlockContent
