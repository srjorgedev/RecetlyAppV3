import axios from "axios"
import { API_URL, ENDPOINTS } from "../../api/ApiClient"

export default async function useAddFavorite(user_id, recipe_id) {
    const response = await axios.post(`${API_URL}${ENDPOINTS.AddFavorite(user_id, recipe_id)}`)
    const data = await response.data

    return {
        message: data.data,
        status: data.status
    }
}   