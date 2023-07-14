import styles from './achievement_block.module.css'
import {useAnimate, useInView} from "framer-motion";
import {useEffect} from "react";
export function AchievementBlock() {

    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)

    useEffect(() => {
     if (isInView) {
       animate(scope.current, { opacity: 1}, { duration: 1 })
     }
     else {
       animate(scope.current, { opacity: 0}, { duration: 0 })
     }
  }, [isInView])

    return (
        <div className={styles.main}>
            <div className={styles.columns} ref={scope}>
            <h2 className={styles.title}>Julia&apos;s Achievements</h2>
            <h3 className={styles.text}>As a top-tier educator, Julia’s accomplishments include award-winning research, student-led victories at coding competitions, and collaborations within the vast world of Computer Science. Explore her wall of fame and witness the sparkle of inspiration.</h3>
            </div>
            </div>
    )
}