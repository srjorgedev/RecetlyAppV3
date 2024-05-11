import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { API_URL, ENDPOINTS } from '../../api/ApiClient'

export default async function useGetRecipe(recipe) {
    const UserId = await AsyncStorage.getItem('UserId')

    const recipesResponsePromise = axios.get(`${API_URL}${ENDPOINTS.GetRecipe(recipe)}`)
    const favoriteResponsePromise = axios.get(`${API_URL}${ENDPOINTS.CheckFavorite(UserId, recipe)}`)
    const commentResponsePromise = axios.get(`${API_URL}${ENDPOINTS.GetComment(recipe)}`)

    const [recipesResponse, favoriteResponse, commentResponse] = await Promise.all([recipesResponsePromise, favoriteResponsePromise, commentResponsePromise])

    return {
        recipe: recipesResponse.data,
        user: UserId,
        isFavorite: favoriteResponse.data.data == "La receta no esta agregada como favorita" ? false : true,
        comments: Array.isArray(commentResponse.data.data) ? commentResponse.data.data : [commentResponse.data.data]
    }
}