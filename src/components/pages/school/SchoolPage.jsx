import {Footer} from "../../ui/footer/Footer.jsx";
import CardsBlock from "./CardsBlock.jsx";
import styles from './school.module.css'

function SchoolPage() {

    return (
        <div>
            <div className={styles.container}>
                <CardsBlock/>
            </div>
            <Footer/>
        </div>
    )
}


export default SchoolPage
