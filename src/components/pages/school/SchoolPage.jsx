import {Footer} from "../../ui/footer/Footer.jsx";
import CardsBlock from "./CardsBlock.jsx";
import styles from './school.module.css'
import MainHeader from "../../ui/header/MainHeader.jsx";

function SchoolPage() {

    return (
        <div>
            <MainHeader/>
            <div className={styles.container}>
                <CardsBlock/>
            </div>
            <Footer/>
        </div>
    )
}


export default SchoolPage
