import { useState } from "react"
import { Keyboard, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import useDynamicStyles from "../../components/styles/useDynamicStyles"
import Button from "../../components/ui/button/Button"
import InputEmail from "../../components/ui/input/EmailInput"
import InputPassword from "../../components/ui/input/PasswordInput"
import { useLogin } from "../../components/hooks/useLogIn"
import AlertNotification from "../../components/notification/Alert"

export default function LogIn({ navigation }) {
    const theme = useDynamicStyles()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [callAlert, setCallAlert] = useState({
        call: false,
        message: '',
        variant: ''
    })

    async function handleLogIn() {
        setLoading(true)
        const data = await useLogin(email, password)
        if (!data.ok) {
            setCallAlert({
                message: data.message,
                variant: data.variant,
                call: data.call
            })
        }
        setLoading(false)
        if (data.ok) navigation.replace('Drawer')
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.MainBackgroundColor }}>
            <View style={{ ...styles.container }}>
                <Text style={{ ...styles.title, color: theme.TextColor }}>¡Bienvenido de nuevo!</Text>
                <View>
                    <InputEmail Label="Correo electronico" onChange={setEmail} />
                    <InputPassword Label="Contraseña" onChange={setPassword} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button TextButton="Entrar" Disabled={loading} onPress={handleLogIn} />
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