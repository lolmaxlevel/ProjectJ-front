import axios from "axios";


const BASE_URL = 'http://localhost:8080'

export const ApplicationService = {
    getAchievements: async () => {
        const response = await axios.get(BASE_URL+ '/all-files')
        return response.data
    }
}