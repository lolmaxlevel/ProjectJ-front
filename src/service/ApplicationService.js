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
        formData.append("name", file.name);
        formData.append("description", "test description");

        return axios.post(BASE_URL + "/upload", formData, {
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
            link.setAttribute('download', name.match(/\..+$/) ? name : name + '.pdf');
            // any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    },

    deleteFile: async (fileId) => {
        let formData = new FormData();

        formData.append("id", Number(fileId));

        return axios.post(
            BASE_URL + "/delete-file",
            null,
            {
                params: {
                    id: Number(fileId)
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    },

updateFile: async (fileId, name, description) => {
        let formData = new FormData();

        formData.append("id", Number(fileId));
        formData.append("name", name);
        formData.append("description", description);

        return axios.post(
            BASE_URL + "/update-file",
            null,
            {
                params: {
                    id: Number(fileId),
                    name: name,
                    description: description
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    }
}