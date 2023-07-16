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

}