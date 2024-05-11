import { View, Text, SafeAreaView, StyleSheet, Keyboard } from "react-native"
import axios from "axios"
import { API_URL, ENDPOINTS } from '../../api/ApiClient'
import Button from '../../components/ui/button/Button'
import useDynamicStyles from '../../components/styles/useDynamicStyles'
import InputText from '../../components/ui/input/TextInput'
import MainLayout from '../../components/layout/MainLayout'
import AlertNotification from "../../components/notification/Alert"
import { useState } from "react"

export default function SignUp({ navigation }) {
    const theme = useDynamicStyles()
    const [loading, setLoading] = useState(false)
    const [callAlert, setCallAlert] = useState({
        call: false,
        message: '',
        variant: ''
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.MainBackgroundColor }}>
            <View style={{ ...styles.container }}>
                <Text style={{ ...styles.title, color: theme.TextColor }}>Crear una cuenta</Text>

                <View style={styles.buttonContainer}>
                    <Button TextButton="Entrar" Disabled={loading} />
                    <Button TextButton="Volver" ButtonStyle={{ backgroundColor: '#222222' }} onPress={() => {
                        navigation.goBack()
                        Keyboard.dismiss()
                    }} />
                </View>
            </View>
            {callAlert.call && <AlertNotification Message={callAlert.message} icon={callAlert.variant} OnEnd={setCallAlert} />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'space-evenly',
    },
    title: {
        fontSize: 45,
        textAlign: 'center'
    },
    buttonContainer: {
        display: 'flex',
        gap: 8
    }
})