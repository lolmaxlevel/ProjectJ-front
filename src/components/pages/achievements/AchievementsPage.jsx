import {Footer} from "../main/footer/Footer.jsx";
import AchievementCard from "./AchievementsCard.jsx";
import MainHeader from "../../ui/header/MainHeader.jsx";
import {useEffect, useState} from "react";
import {ApplicationService} from "../../../service/ApplicationService.js";

function AchievementsPage() {
    const [files, setFiles] = useState([])

    useEffect(() => {
        ApplicationService.getAchievements().then((response) => {
            setFiles(response)
        })

    }, []);
    return (
        <div style={{display:"flex", minHeight:"100vh", flexDirection:"column", justifyContent:"space-between"}}>
            <MainHeader/>
            <div style={{minHeight:"100px"}}>
                {
                    files.length === 0 && [1,2,3,4].map((item, index) => {
                        return (
                            <AchievementCard key={index} count={index+1} skeleton={true}/>
                        )
                    })
                }
            {files.map((file, index) => {
                return (
                    <AchievementCard key={index} count={index+1} file={file.id} description={file.description}
                                     name={file.name}/>
                )
            })
            }
            </div>
            <Footer/>
        </div>
    );
}


export default AchievementsPage
