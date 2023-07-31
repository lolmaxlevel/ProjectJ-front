import {useNavigate} from 'react-router-dom';
import styles from './header.module.css';
function MainHeader() {
    const navigate = useNavigate();
    return (
        <header className={styles.main}>
            <h1 onClick={() => navigate(-1)} className={styles.arrow}>➤</h1>
        </header>
    );
}


export default MainHeader;