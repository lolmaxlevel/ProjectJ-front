import styles from './footer.module.css';
import {InstagramLogo} from "./logo/InstagramLogo.jsx";
import {TwitterLogo} from "./logo/TwitterLogo.jsx";
import {FbLogo} from "./logo/FbLogo.jsx";
import {TwitchLogo} from "./logo/TwitchLogo.jsx";

export function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.copyright}>
                <p className={styles.copyrightText}>© Julia 2023. All Rights Reserved.</p>
                <div className={styles.social}>
                    <TwitterLogo/>
                    <InstagramLogo/>
                    <FbLogo/>
                    <TwitchLogo/>
                </div>
            </div>

        </div>
    )
}
