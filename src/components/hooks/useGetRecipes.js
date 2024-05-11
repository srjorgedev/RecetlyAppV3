import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { API_URL, ENDPOINTS } from '../../api/ApiClient'

export default async function useGetRecipes() {
    const UserId = await AsyncStorage.getItem('UserId')

    if (UserId == "NOT-LOGGED") {
        return {
            recipes: null
        }
    }

    const recipesResponsePromise = axios.get(`${API_URL}${ENDPOINTS.GetUserRecipes(UserId)}`)
    const [recipesResponse] = await Promise.all([recipesResponsePromise])
    const recipes = recipesResponse.data

    const request = recipes.data.map(async (recipe) => {
        const response = await axios.get(`${API_URL}${ENDPOINTS.GetRecipeCard(recipe)}`)
        return await response.data
    })

    const DataRecipes = await Promise.all(request)

    return {
        recipes: DataRecipes
    }
}