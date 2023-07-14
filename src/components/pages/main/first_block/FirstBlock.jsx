import styles from './first_block.module.css'
import Content from "./Content.jsx";
import { useAnimate, useInView } from "framer-motion"
import {useEffect} from "react";
function FirstBlock() {

    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)

    useEffect(() => {
     if (isInView) {
       animate(scope.current, { opacity: 1 }, { duration: 1 })
     }
        else {
         animate(scope.current, { opacity: 0 }, { duration: 0 })
     }
  }, [isInView])

    return (
      <div className={styles.hero}>
          <div ref={scope}>
            <Content/>
          </div>
      </div>
  )
}

export default FirstBlock
