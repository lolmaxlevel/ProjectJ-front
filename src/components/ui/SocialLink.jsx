import styles from './social.module.css'
// eslint-disable-next-line react/prop-types
export function SocialLink({icon, link, text, isLast=false}) {
    return (
        <a href={link} style={{textDecoration:"none"}}>
        <div className={styles.social} style={{borderBottomWidth: isLast?"0px":"1px"}}>
            <img src={icon} alt={text} className={styles.icon}/>
            <h3 className={styles.text}>{text}</h3>
        </div>
        </a>
    )
}
