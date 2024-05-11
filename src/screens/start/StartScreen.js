import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native'
import Button from '../../components/ui/button/Button'
import Constants from 'expo-constants'
import MainColor from '../../components/styles/Theme'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function StartScreen({ navigation }) {
    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={{ uri: 'https://ik.imagekit.io/uv3u01crv/background_2.png?updatedAt=1710824830029' }}
            resizeMode='cover'
            blurRadius={4}
        >
            <View style={{ backgroundColor: 'rgba(0,0,0,0.45)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1, }} />
            <View style={{ ...styles.container, paddingTop: Constants.statusBarHeight }}>
                <View style={{ ...styles.textContainer }}>
                    <Text style={{ ...styles.slogan, paddingHorizontal: 10 }}>¿Que vamos a cocinar hoy?</Text>
                    <Text style={{ fontSize: 50, color: MainColor[200], textAlign: 'center' }}>RECETLY</Text>
                </View>
                <View style={{ ...styles.buttonContainer }}>
                    <Button TextButton="Iniciar sesion" onPress={() => navigation.navigate('LogIn')} />
                    <Button TextButton="Registrarse" onPress={()=> navigation.navigate('SignUp')} ButtonStyle={{ backgroundColor: 'transparent', borderWidth: 5, borderColor: MainColor[400] }} />
                    <Button TextButton="Entrar como invitado" ButtonStyle={{ backgroundColor: "#222222" }}
                        onPress={() => {
                            AsyncStorage.setItem('UserId', 'NOT-LOGGED')
                            navigation.replace('Drawer')
                        }} />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        zIndex: 2
    },
    slogan: {
        fontSize: 100,
        fontWeight: '800',
        color: "white"
    },
    textContainer: {
        height: '70%',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    buttonContainer: {
        height: '30%',
        display: 'flex',
        gap: 8
    },
})