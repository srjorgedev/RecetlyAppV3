import axios from "axios"
import { API_URL, ENDPOINTS } from "../../api/ApiClient"
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function useLogin(email, password) {
    try {

        const response = await axios.post(`${API_URL}${ENDPOINTS.LogIn}`,
            {
                email: email,
                password: password
            })

        const data = await response.data
        if (data.error || data.status != 'Ok' || !data.login) {
            return {
                ok: false,
                message: data.errorMessage,
                variant: 'warn',
                call: true
            }
        }

        AsyncStorage.setItem('UserId', data.id)
        return { ok: data.login }
    } catch (error) {
        console.log(error)
    }
}