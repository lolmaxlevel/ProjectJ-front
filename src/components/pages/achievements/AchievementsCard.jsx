import styles from './achievement.module.css'
import PdfViewer from "../../ui/PdfViewer.jsx";


function AchievementCard({count, file}) {
    let bgColors = ["#B391E6", "#b860cf", "#FFCCF6", "#FFC1A1", "#FDA1FF", "#9298E8"]
    let textColors = ["#A5A1FF", "#77409C", "#E8ABFC", "#FCD2CA", "#EACAFC", "#C5AEFF"]
    count = count%6
    return (
        <div className={styles.container} style={{backgroundColor:bgColors[count]}}>
            <div className={styles.leftColumn} style={{order:count%2?1:0, backgroundColor:textColors[count]}}>
                <div className={styles.info}>
                    <h1 className={styles.name}>Тут типа короткое название документа</h1>
                    <h2 className={styles.description}>тут типа описание</h2>
                    <div className={styles.buttons}>
                        <div className={styles.blackButton}>кнопка скачать</div>
                        <div className={styles.whiteButton}>кнопка поделиться</div>
                    </div>
                </div>
            </div>
            <div className={styles.rightColumn}>
                <PdfViewer file={file}/>
            </div>
        </div>
    );
}


export default AchievementCard
