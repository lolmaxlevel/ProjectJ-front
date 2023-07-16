import { useState } from 'react';
import {ApplicationService} from "../../service/ApplicationService.js";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    ApplicationService.uploadFile(file, (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
    }).then((response) => {
      setMessage(response.data.message);
      setFile(null)
    }).catch((error) => {
        console.log(error);
            setProgress(0);
            setMessage("Could not upload the file!");
            setFile(null);

    });
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
        <div>{message} {progress}</div>
    </div>
  );
}

export default FileUpload;