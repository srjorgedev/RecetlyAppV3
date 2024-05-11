import axios from "axios"
import { API_URL, ENDPOINTS } from "../../api/ApiClient"

export default async function useAddComment(userId, recipeId, comment) {
    const response = await axios.post(`${API_URL}${ENDPOINTS.PostComment(recipeId, userId)}`,
        {
            comment: comment
        })

    const data = await response.data

    return {
        message: data.data,
        status: data.status
    }
}