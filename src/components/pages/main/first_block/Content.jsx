import styles from './first_block.module.css'
import MyText from "./MyText.jsx";
import '/hat.svg'
import {useAnimate, useInView} from "framer-motion";
import {useEffect} from "react";
import { animate } from "framer-motion"
function Content() {
    const [first_scope] = useAnimate()
    const isInView = useInView(first_scope)

    useEffect(() => {
     if (isInView) {
         animate("p", { opacity: 1, y: 0}, { type: "spring" })
     }
     else {
       animate("p", { opacity: 0, y: -100}, { duration: 1 })
     }
  }, [isInView])

  return (
      <div className={styles.content} ref={first_scope}>
          <p className={styles.juliaSSchool} >Julia’s School</p>
          <MyText/>
          <p className={styles.explore}>Explore</p>
          <p className={styles.teaching}>Teaching</p>
          <p className={styles.achievements}>Achievements</p>
          <img className={styles.hat} src={'/hat.svg'} alt={''}/>
      </div>
  )
}

export default Content
