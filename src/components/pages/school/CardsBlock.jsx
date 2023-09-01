import styles from './school.module.css'
import ClassCard from "./ClassCard.jsx";

function CardsBlock() {

    let classes = ["5-6", "7а", "7л", "8а", "8л", "9а", "9л", "10", "11"]
    let colors = ["#fff5d0", "#ffdfc2", "#ffc0c1"]

    return (
        <div>
            <div className={styles.disclaimerContainer}>
                <h1 className={styles.disclaimer}>
                    Приведенные далее материалы были подготовлены,
                    обработаны и получены <del>средством массовой информации,
                    выполняющим функции иностранного агента</del> из авторской
                    <a href={"https://bosova.ru/"} className={styles.links}> мастерской Л.Л. Босовой</a> и
                    личного <a href={"https://kpolyakov.spb.ru"} className={styles.links}>веб-сайта К.Ю. Полякова.</a>
                </h1>
            </div>
            <div className={styles.cardGrid}>
                {classes.map((item, index) => {
                    return <ClassCard key={index}
                                      title={item}
                                      description={`ну ето описание ${item} класса`}
                                      link={item.replace("а", "a")
                                          .replace("л", "l")}
                                      color={colors[index % 3]}
                    />
                })}
            </div>
        </div>
    )
}


export default CardsBlock
