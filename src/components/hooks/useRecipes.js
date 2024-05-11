import { API_URL, ENDPOINTS } from '../../api/ApiClient'
import axios from "axios"

export default async function useRecipes() {
    try {
        const responses = await Promise.all([
            axios.get(`${API_URL}${ENDPOINTS.GetMexRecipes}`),
            axios.get(`${API_URL}${ENDPOINTS.GetItaRecipes}`),
            axios.get(`${API_URL}${ENDPOINTS.GetOriRecipes}`),
            axios.get(`${API_URL}${ENDPOINTS.GetPostresRecipes}`),
            axios.get(`${API_URL}${ENDPOINTS.GetDrinkRecipes}`),
            axios.get(`${API_URL}${ENDPOINTS.GetDaily}`)
        ])

        const [mexResponse, itaResponse, oriResponse, posResponse, driResponse, dailyResponse] = responses

        return {
            mex: await mexResponse.data.data,
            italiana: await itaResponse.data.data,
            oriental: await oriResponse.data.data,
            postres: await posResponse.data.data,
            drink: await driResponse.data.data,
            daily: await dailyResponse.data
        }

    } catch (error) {
        console.log(error)
    }
}