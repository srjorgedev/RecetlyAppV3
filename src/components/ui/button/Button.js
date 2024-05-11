import { useState } from "react"
import { Animated, Pressable, StyleSheet, Text, ActivityIndicator } from "react-native"
import MainColor from '../../styles/Theme'

export default function Button({ TextButton = "Texto del boton", onPress, TextStyle, ButtonStyle, Disabled = false }) {
    const [scaleAnimation] = useState(new Animated.Value(1))

    function handleAnimationIn() {
        Animated.spring(scaleAnimation, {
            toValue: 0.97,
            useNativeDriver: true
        }).start()
    }

    function handleAnimationOut() {
        Animated.spring(scaleAnimation, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }

    return (
        <Pressable onPress={onPress} onPressIn={handleAnimationIn} onPressOut={handleAnimationOut} disabled={Disabled}>
            <Animated.View style={{ ...styles.button, transform: [{ scale: scaleAnimation }], ...ButtonStyle }}>
                <Text style={{ fontSize: 30, ...TextStyle, color: '#f1f1f1' }}>
                    {!Disabled && TextButton}
                    {Disabled && <ActivityIndicator />}
                </Text>
            </Animated.View>
        </Pressable >
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: MainColor[600],
        height: 50,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})