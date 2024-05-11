import React, { useState } from "react"
import { ActivityIndicator, Animated, Pressable, StyleSheet } from "react-native"

function Round({ children, ButtonStyle, Disabled = false, onPress, ToScale = 0.98 }) {
    const [scaleAnimation] = useState(new Animated.Value(1))

    function handleAnimationIn() {
        Animated.spring(scaleAnimation, {
            toValue: ToScale,
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
                {!Disabled && children}
                {Disabled && <ActivityIndicator />}
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: MainColor[600],
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default React.memo(Round)