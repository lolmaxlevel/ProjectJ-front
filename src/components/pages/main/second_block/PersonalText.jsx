import styles from './second_block.module.css'
import '/computer.svg'
import {useInView, useAnimate} from "framer-motion";
import {useEffect} from "react";

function PersonalText() {
    const [second_scope, animate] = useAnimate()
    const isInView = useInView(second_scope)
    useEffect(() => {
        if (isInView) {
            animate(second_scope.current, {x: 0}, {duration: 0.5})
        } else {
            animate(second_scope.current, {x: 200}, {duration: 0.5})
        }
    }, [isInView])
    return (
        <div className={styles.content} >
            <div className={styles.left}>
                <div className={styles.image}></div>
            </div>
            <div className={styles.right} ref={second_scope}>
                <h2 className={styles.introduction}>💻Introduction</h2>
                <h3 className={styles.right2}>Julia, an outstanding Computer Science instructor at a renowned Russian
                    institution, is molding the forthcoming era of tech through every individual learner. Immerse
                    yourself in her universe and explore the unique qualities that set her apart.</h3>
            </div>
        </div>
    )
}

export default PersonalText
