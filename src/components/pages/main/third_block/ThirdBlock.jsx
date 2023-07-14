import styles from './third_block.module.css'
import QnA from "../../../ui/QnA.jsx";
import {useAnimate, useInView, animate} from "framer-motion";
import {useEffect} from "react";

function ThirdBlock() {

    const [scope] = useAnimate()
    const isInView = useInView(scope)

    useEffect(() => {
     if (isInView) {
       animate(scope.current, { opacity: 1 }, { duration: 1 })
     }
     else {
       animate(scope.current, { opacity: 0 }, { duration: 1 })
     }
  }, [isInView])

    return (
        <div className={styles.faq} >
            <div className={styles.content} ref={scope}>
                <div className={styles.faqTitle}>
                    <h2 className={styles.getToKnowJulia}>Get to Know Julia</h2>
                </div>
                <div className={styles.faqContent}>
                    <div className={styles.image}/>
                    <div>
                        <QnA question="Her Teaching"
                             answer="Imparting knowledge with passion and dedication"/>
                        <QnA question="Achievements Galore"
                             answer="A proven track record of success in academics and competitions"/>
                        <QnA question="Students’ Success"
                             answer="Nurturing the next generation of computer wizards"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThirdBlock
