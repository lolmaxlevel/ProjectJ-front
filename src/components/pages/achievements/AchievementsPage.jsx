import {Footer} from "../main/footer/Footer.jsx";
import AchievementCard from "./AchievementsCard.jsx";
import MainHeader from "../../ui/header/MainHeader.jsx";

function AchievementsPage() {

    return (
        <div style={{height:"100%"}}>
            <MainHeader/>
            <AchievementCard count={1} file={1202}/>
            <AchievementCard count={2} file={1202}/>
            <AchievementCard count={3} file={1202}/>
            <AchievementCard count={4} file={1202}/>
            <AchievementCard count={5} file={1202}/>
            <Footer/>
        </div>
    );
}


export default AchievementsPage
