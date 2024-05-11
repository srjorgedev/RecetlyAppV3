import ColorPicker from "react-native-wheel-color-picker"
import { Modal, View, Text, StyleSheet } from "react-native"
import Button from "../ui/button/Button"
import useDynamicStyles from "../styles/useDynamicStyles"

export default function ColorPickerModal({ setColorPicker, setFavColor, setUpdateData, favColor }) {
    const theme = useDynamicStyles()

    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            width: '90%',
            aspectRatio: 1,
            backgroundColor: theme.MainBackgroundColor,
            padding: 20,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'space-around',
            borderWidth: 1,
            borderColor: theme.InvertColor
        },
    })

    return (
        <Modal
            transparent
            visible
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ColorPicker swatches={false} thumbSize={25}
                        color={favColor}
                        onColorChangeComplete={(color) => setFavColor(color)}
                        gapSize={null}
                    />

                    <Button
                        TextButton="Confirmar"
                        ButtonStyle={{ backgroundColor: theme.MainButtonBackgroundColor, marginVertical: 16, height: 40, borderRadius: 20 }}
                        TextStyle={{ fontSize: 20, color: theme.TextColor }}
                        onPress={() => {
                            setColorPicker(false)
                            setUpdateData(prevData => ({
                                ...prevData, 
                                color: favColor 
                            }))
                        }}
                    />
                </View>
            </View>
        </Modal>
    )
}