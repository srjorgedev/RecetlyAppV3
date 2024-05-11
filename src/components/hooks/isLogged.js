import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { API_URL, ENDPOINTS } from '../../api/ApiClient'

export default async function isLogged() {
    const UserId = await AsyncStorage.getItem('UserId')

    if (UserId == "NOT-LOGGED") {
        return {
            logged: false,
            data: null,
        }
    }

    const responsePromise = axios.get(`${API_URL}${ENDPOINTS.GetUserData(UserId)}`)
    const [response] = await Promise.all([responsePromise])
    const data = response.data

    return {
        logged: true,
        data: data.user,
    }
}