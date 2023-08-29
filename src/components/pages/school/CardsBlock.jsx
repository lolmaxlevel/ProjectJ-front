import styles from './school.module.css'
import ClassCard from "./ClassCard.jsx";

function CardsBlock() {

    let classes = ["5-6", "7а", "7л", "8а", "8л", "9а", "9л", "10", "11"]
    let colors = ["#fff5d0", "#ffdfc2","#ffc0c1"]

    return (
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
    )
}


export default CardsBlock
