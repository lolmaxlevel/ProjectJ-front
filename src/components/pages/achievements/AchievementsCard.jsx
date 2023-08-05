import styles from './achievement.module.css'
import PdfViewer from "../../ui/PdfViewer.jsx";
import {ApplicationService} from "../../../service/ApplicationService.js";
import {Skeleton} from "antd";

function AchievementCard({side, bgColor, textColor, name, description, file, skeleton = false}) {

    return (
        <div className={styles.container} style={{backgroundColor: bgColor}}>
            <div className={styles.leftColumn} style={{order: side, backgroundColor: textColor}}>
                <div className={styles.info}>
                    {skeleton ? <Skeleton active/> : <h1 className={styles.name}>{name}</h1>}
                    <h2 className={styles.description}>{description}</h2>
                    <div className={styles.buttons}>
                        {skeleton
                            ? <Skeleton.Button size="large" active/>
                            : <div className={styles.blackButton}
                                   onClick={() => ApplicationService.downloadFile(file)}>скачать
                            </div>
                        }
                        {skeleton
                            ? <Skeleton.Button active/>
                            : <div className={styles.whiteButton}>поделиться</div>}
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
