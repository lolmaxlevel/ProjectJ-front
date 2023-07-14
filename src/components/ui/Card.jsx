import styles from '../pages/main/forth_block/forth_block.module.css'
import {useAnimate, useInView} from "framer-motion";
import {useEffect} from "react";

// eslint-disable-next-line react/prop-types
function Card({img, title, text}) {
    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)

    useEffect(() => {
     if (isInView) {
         animate(scope.current, { opacity: 1}, { duration: 1 })
         animate("h3", { y:0}, { type: "spring" })
     }
     else {
         animate(scope.current, { opacity: 0}, { duration: 0 })
         animate("h3", {y:100}, { duration: 0 })
     }
  }, [isInView])

    if (img === undefined) {
        img = "/card_img_1.jpg"
    }
    if (title === undefined) {
        title = " Inspiring Innovators "
    }
    if (text === undefined) {
        text = " Julia’s students tackle complex projects with expert guidance. "
    }

    return (
        <div className={styles.card} ref={scope}>
            <div className={styles.cardImage}>
                <div className={styles.cardImage} style={{backgroundImage: "url("+img+")"}}/>
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <h3 className={styles.cardText}>{text}</h3>
            </div>
        </div>
    )
}

export default Card
