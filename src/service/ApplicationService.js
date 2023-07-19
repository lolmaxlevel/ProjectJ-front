import axios from "axios";


const BASE_URL = 'http://localhost:8080'

export const ApplicationService = {
    getAchievements: async () => {
        const response = await axios.get(BASE_URL + '/all-files')
        return response.data
    },

    uploadFile: async (file, onUploadProgress) => {
        let formData = new FormData();

        formData.append("file", file);

        return axios.post(BASE_URL + "/file", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    },

    downloadFile: async (fileId, name="1.pdf") => {
        return axios.get(BASE_URL + "/files/" + fileId, {
            responseType: "blob",
        }).then((response) => {
            //little hack to download file using axios probably there is a better way :)
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', name); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    }
}