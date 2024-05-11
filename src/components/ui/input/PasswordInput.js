import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import useDynamicStyles from '../../styles/useDynamicStyles'
import ShowPassword from '../../svg/ShowPassword'
import HidePassword from '../../svg/HidePassword'
import { useState } from 'react'

export default function InputPassword({ Label = "Titulo del Input", InputStyle, TextStyle, onChange, Placeholder }) {
    const theme = useDynamicStyles()
    const [showPassword, setShowPassword] = useState(true)

    const styles = StyleSheet.create({
        input: {
            height: 50,
            paddingHorizontal: 10,
            fontSize: 22,
            backgroundColor: theme.SecondaryColor
        },
        label: {
            fontSize: 24,
            color: theme.TextColor,
            marginBottom: 4
        },
        container: {
            marginVertical: 8
        },
        show: {
            position: 'absolute',
            right: 0
        }
    })

    function handleShowPassword() {
        if (!showPassword) setShowPassword(true)
        if (showPassword) setShowPassword(false)
    }

    return (
        <View style={{ ...styles.container }}>
            <Text style={{ ...TextStyle, ...styles.label }}>{Label}</Text>
            <View>
                <TextInput
                    style={{ ...styles.input, ...InputStyle, color: theme.InputTextColor }}
                    onChangeText={onChange}
                    numberOfLines={1}
                    keyboardType='default'
                    placeholder={Placeholder}
                    secureTextEntry={showPassword}
                />
                <Pressable onPress={handleShowPassword} style={{ ...styles.show }}>
                    {showPassword && <HidePassword fill={theme.SvgColor} />}
                    {!showPassword && <ShowPassword fill={theme.SvgColor} />}
                </Pressable>
            </View>
        </View>
    )
}

