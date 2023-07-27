import { lazy } from 'react';
import styles from '../../../assets/styles/global.module.css'

const FirstBlock = lazy( () => import("./first_block/FirstBlock.jsx"));
const SecondBlock = lazy( () => import("./second_block/SecondBlock.jsx"));
const ThirdBlock = lazy( () => import("./third_block/ThirdBlock.jsx"));
const ForthBlock = lazy( () => import("./forth_block/ForthBlock.jsx"));
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
