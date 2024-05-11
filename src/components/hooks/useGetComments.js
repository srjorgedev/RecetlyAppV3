import axios from "axios"
import { API_URL, ENDPOINTS } from '../../api/ApiClient'

export default async function useGetComments(recipe) {
    const commentResponsePromise = axios.get(`${API_URL}${ENDPOINTS.GetComment(recipe)}`)
    const [commentResponse] = await Promise.all([commentResponsePromise])

    return {
        comments: Array.isArray(commentResponse.data.data) ? commentResponse.data.data : [commentResponse.data.data]
    }
}