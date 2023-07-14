import styles from './forth_block.module.css'
import Card from "../../../ui/Card.jsx";
function ForthBlock() {

  return (
      <div className={styles.main}>
          <div className={styles.cardGrid}>
              <Card img="/card_img_1.jpg" title="Inspiring Innovators" text="Julia’s students tackle complex projects with expert guidance."/>
              <Card img="/card_img_2.jpg" title="Collaborative Learning" text="Julia fosters a teamwork-focused environment for hands-on experience."/>
          </div>
      </div>
  )
}

export default ForthBlock
