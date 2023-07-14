import {useEffect, useState} from "react";
import {ApplicationService} from "../../../service/ApplicationService.js";

function Admin() {

    const [files, setFiles] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const result = await ApplicationService.getAchievements();
            console.log(result)
            setFiles(result);
        }

        fetchData().then(r => console.log(r));
    }, []);
    return (
        <div>
            {files.map((file) => {
                return (
                    <div key={file.id}>
                        <h1>{file.name}</h1>
                        <h1>{file.type}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default Admin
