import {Footer} from "../../ui/footer/Footer.jsx";
import AchievementCard from "./AchievementsCard.jsx";
import MainHeader from "../../ui/header/MainHeader.jsx";
import {useEffect, useState} from "react";
import {ApplicationService} from "../../../service/ApplicationService.js";
import {mixHexes} from "../../../utils/ColorsMixer.js";

function AchievementsPage() {
    const [files, setFiles] = useState([1, 2, 3, 4])

    const [skeleton, setSkeleton] = useState(true);
    useEffect(() => {
        ApplicationService.getAchievements().then((response) => {
            setSkeleton(false)
            setFiles(response)
        })
        window.addEventListener('scroll', changeColorOnScroll)
    }, []);

    // maybe move colors to separate component
    const [bgColors, setBgColors] = useState(["#B391E6", "#b860cf", "#FFCCF6", "#FFC1A1", "#FDA1FF", "#9298E8"])

    const [textColors, setTextColors] = useState(["#A5A1FF", "#77409C", "#E8ABFC", "#FCD2CA", "#EACAFC", "#C5AEFF"])

    let newBgColors = ["#E6E391", "#cfb860", "#F6CCFF", "#A1FFC1", "#FFA1FD", "#E89298"]
    let newTextColors = ["#FFA5A1", "#9C7740", "#f578c7", "#CAFCD2", "#FCEACA", "#FFC5AE"]

    function changeColorOnScroll() {
        const scrollY = window.scrollY
        const scrollHeight = document.body.scrollHeight
        const height = window.innerHeight
        const scrollPercent = scrollY / (scrollHeight - height)

        setBgColors(bgColors.map((color, index) => {
            return mixHexes(color, newBgColors[index], scrollPercent)
        }))
        setTextColors(textColors.map((color, index) => {
            return mixHexes(color, newTextColors[index], scrollPercent)
        }))
    }

    return (
        <div style={{display: "flex", minHeight: "100vh", flexDirection: "column", justifyContent: "space-between"}}>
            <MainHeader/>
            <div style={{minHeight: "100px"}}>
                {files.map((file, index) => {
                    return (
                        <AchievementCard key={index} side={index % 2} bgColor={bgColors[(index + 1) % 6]}
                                         textColor={textColors[(index + 1) % 6]} file={file.id}
                                         description={file.description}
                                         name={file.name} skeleton={skeleton}/>
                    )
                })
                }
            </div>
            <Footer/>
        </div>
    );
}


export default AchievementsPage
