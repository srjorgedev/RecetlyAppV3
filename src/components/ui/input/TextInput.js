import { View, Text, TextInput, StyleSheet } from 'react-native'
import useDynamicStyles from '../../styles/useDynamicStyles'

export default function InputText({ Label = "Titulo del Input", InputStyle, TextStyle, onChange, Placeholder }) {
    const theme = useDynamicStyles()

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
        }
    })

    return (
        <View style={{ ...styles.container }}>
            <Text style={{ ...TextStyle, ...styles.label }}>{Label}</Text>
            <TextInput
                style={{ ...styles.input, ...InputStyle, color: theme.InputTextColor }}
                onChangeText={onChange}
                numberOfLines={1}
                keyboardType='default'
                placeholder={Placeholder}
            />
        </View>
    )
}

