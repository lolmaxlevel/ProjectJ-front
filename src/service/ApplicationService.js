import axios from "axios";
import {JwtManager} from "./JwtService.js";

// const csrfToken = document.cookie.split("=")[1];
// axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
const BASE_URL = `http://${import.meta.env.VITE_BASE_URL}`


export const ApplicationService = {
    getAchievements: async () => {
        const response = await axios.get(BASE_URL + '/all-files', {})
        return response.data
    },

    uploadFile: async (file, name = file.name, description = "test") => {
        let formData = new FormData();

        formData.append("file", file);
        formData.append("name", name);
        formData.append("description", description);

        return axios.post(BASE_URL + "/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${JwtManager.getCurrentAccessToken()}`,
            },
        }
        ).catch((error) => {
            refreshHandler(error.response, () => {
                ApplicationService.uploadFile(file, name, description)
            });
        })
    },

    downloadFile: async (fileId) => {
        return axios.get(BASE_URL + "/files/" + fileId, {
            responseType: "blob",
        }).then((response) => {
            //little hack to download file using axios probably there is a better way :)
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);
            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', response.headers.get('FirstBlockContent-Disposition').split('filename=')[1].replace(/"/g, ''));
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
                    Authorization: `Bearer ${JwtManager.getCurrentAccessToken()}`,
                },
            }
        ).catch((error) => {
            refreshHandler(error.response, () => {
                ApplicationService.deleteFile(fileId)
            });
        })
    },

    updateFile: async (fileId, name, description) => {
        return axios.put(
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
                    Authorization: `Bearer ${JwtManager.getCurrentAccessToken()}`,
                },
            }
        ).catch((error) => {
            refreshHandler(error.response, () => {
                ApplicationService.updateFile(fileId, name, description)
            });
        })
    },

    login: async function (username, password) {
        return JwtManager.login(username, password);
    },
    logout: async function () {
        return JwtManager.logout();
    },

    register: async function (username, password) {
        console.log(document.cookie.split("=")[1])
        let formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)

        return axios.post(`${BASE_URL}/register`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                // Do not add Authorization Header here
            },
        }).then((response) => {
            console.log(response.headers)
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 409 || response.status === 403 || response.status === 400) {
                return false;
            } else {
                console.log("Unexpected response status: " + response.status);
                return false;
            }
        }).then((data) => {
            if (data) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("username", username);
                return true;
            }
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }
}

/**
 * This function is used to handle 403 response status.
 * If the response status is 403, it means that the access token has expired.
 * In this case, we need to refresh the access token and repeat the request.
 * @param response
 * @param func
 * @returns {*|Promise<*>}
 */
function refreshHandler(response, func) {

    if (response.status === 403) {
        console.log("Access token has expired, refreshing...");
        return JwtManager.refreshAccessToken().then(
            () => {
                return func();
            },
            () => {
                // The promise was rejected, so the refresh token has expired or is invalid
                // We need to log out the user to prevent further errors
                JwtManager.logout();
            }
        );
    } else {
        return response;
    }
}