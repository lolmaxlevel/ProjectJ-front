import styles from './question.module.css'
import {useAnimate, useInView} from "framer-motion";
import {useEffect} from "react";

// eslint-disable-next-line react/prop-types
function QnA({question = "", answer = ""}) {

    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)

    useEffect(() => {
     if (isInView) {
       animate(scope.current, { opacity: 1, y: 0}, { duration: 1 })
     }
     else {
       animate(scope.current, { opacity: 0, y: -100}, { duration: 1 })
     }
  }, [isInView])

  return (
      <div ref={scope}>
          <h2 className={styles.question}>
              {question}
          </h2>

          <h2 className={styles.answer}>
              {answer}
          </h2>
      </div>
  )
}

export default QnA
