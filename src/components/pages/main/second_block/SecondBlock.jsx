import styles from './second_block.module.css'
import PersonalText from "./PersonalText.jsx";

function FirstBlock() {

  return (
      <div className={styles.text}>
          <PersonalText/>
      </div>
  )
}

export default FirstBlock
