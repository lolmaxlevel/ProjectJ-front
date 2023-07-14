import styles from './connect_block.module.css'
import {SocialLink} from "../../../ui/SocialLink.jsx";
import {useAnimate, useInView} from "framer-motion";
import {useEffect} from "react";

export function ConnectBlock() {

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
        <div className={styles.main}>
            <div className={styles.rows} ref={scope}>
                <div>
                    <h2 className={styles.title}>Connect</h2>
                    <h3 className={styles.text}>Julia loves sharing ideas, discussing teaching strategies, or just talking about her world of Computer Science. Reach out and give her a virtual high-five on social media!</h3>
                </div>
                <div className={styles.social}>
                    <SocialLink icon="/twitter.svg" link="https://google.com" text="Twitter"/>
                    <SocialLink icon="/inst.svg" link="https://google.com" text="Instagram"/>
                    <SocialLink icon="/linkedin.svg" link="https://google.com" text="LinkedIn" isLast={true}/>
                </div>
            </div>
        </div>
    )
}
