import styles from '../../../assets/styles/global.module.css'
import FirstBlock from "./first_block/FirstBlock.jsx";
import SecondBlock from "./second_block/SecondBlock.jsx";
import ThirdBlock from "./third_block/ThirdBlock.jsx";
import ForthBlock from "./forth_block/ForthBlock.jsx";
import {AchievementBlock} from "./achievment_block/AchievmentBlock.jsx";
import {ConnectBlock} from "./connect_block/ConnectBlock.jsx";
import {Footer} from "./footer/Footer.jsx";
import Login from "./Login.jsx";
function Main() {

  return (
      <div className={styles.desktop}>
          <FirstBlock/>
          <SecondBlock/>
          <ThirdBlock/>
          <ForthBlock/>
          <AchievementBlock/>
          <ConnectBlock/>
          <Footer/>
          <Login/>
      </div>
  )
}

export default Main
