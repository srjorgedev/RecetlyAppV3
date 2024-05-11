import { Dimensions, Image, Pressable, StyleSheet, Text, View, Animated } from 'react-native'
import useDynamicStyles from '../../styles/useDynamicStyles'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Card({ onPress, Title, Img, Id }) {
    const theme = useDynamicStyles()
    const navigation = useNavigation()
    const DeviceWidth = Dimensions.get('screen').width

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

    const styles = StyleSheet.create({
        card: {
            width: (DeviceWidth / 2) - 20,
            height: 'auto',
            gap: 4
        },
        img: {
            flex: 1,
            aspectRatio: 16 / 9,
            borderRadius: 8,
        },
        recipeName: {
            fontSize: 20,
            color: theme.TextColor
        },
        textContainer: {
            borderWidth: 1,
            borderColor: theme.ThirdColor,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 8
        }
    })

    return (
        <Pressable onPress={() => navigation.navigate('Recipe', { id: Id })} onPressIn={handleAnimationIn} onPressOut={handleAnimationOut}>
            <Animated.View style={{ ...styles.card, transform: [{ scale: scaleAnimation }] }}>
                <View style={{ borderWidth: 1, borderRadius: 8, borderColor: theme.ThirdColor }}>
                    <Image style={styles.img} source={{ uri: Img }} />
                </View>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.recipeName}>{Title ?? "Receta no existe"}</Text>
                </View>
            </Animated.View>
        </Pressable>
    )
}