import { View, ActivityIndicator } from "react-native"
import useDynamicStyles from "../components/styles/useDynamicStyles"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

export default function LoadingDataScreen() {
    const theme = useDynamicStyles()
    const navigation = useNavigation()

    useEffect(() => {
        GetUser()
    }, [])

    async function GetUser() {
        try {
            const User = await AsyncStorage.getItem('UserId')

            if (User === "NOT-LOGGED" || User == "" || User === null) {
                navigation.replace('StartScreen')
            } else {
                navigation.replace('Drawer')
            }
        } catch (error) {
            console.error('Error al cargar los datos del usuario:', error)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.MainBackgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={50} />
        </View>
    )
}