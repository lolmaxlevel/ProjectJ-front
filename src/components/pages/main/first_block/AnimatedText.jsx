import styles from './first_block.module.css'
import {useEffect} from "react";

function AnimatedText({text}) {

    useEffect(() => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let interval = null;

        document.querySelector("h1").onmouseover = event => {
            let iteration = 0;

            clearInterval(interval);

            interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return event.target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");

                if (iteration >= event.target.dataset.value.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        }
    }, []);

    return (
        <div className={styles.text}>
            <h1 className={styles.helloThere} data-value={text}>{text}</h1>
        </div>
    )
}

export default AnimatedText
