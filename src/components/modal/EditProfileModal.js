import React, { useState } from "react"
import { Animated, Image, Modal, PanResponder, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import useDynamicStyles from "../styles/useDynamicStyles"
import Back from "../svg/Back"
import CameraIcon from "../svg/Camera"
import Button from "../ui/button/Button"
import Round from "../ui/button/Round"
import * as ImagePicker from 'expo-image-picker'
import ColorPickerModal from "./ColorPickerModal"
import axios from "axios"
import { API_URL, ENDPOINTS } from "../../api/ApiClient"

export default function EditProfileModal({ navigation, onEdit, UserData, modalVisible, setModalVisible }) {
    const theme = useDynamicStyles()
    const [user, setUser] = useState(UserData)
    const [url, setUrl] = useState()
    const [colorPicker, setColorPicker] = useState(false)
    const [favColor, setFavColor] = useState(UserData.userColor ? UserData.userColor : theme.ThirdColor)
    const [loading, setLoading] = useState(false)

    const [updateData, setUpdateData] = useState({
        name: UserData.userName,
        username: UserData.userNickname,
        lastname: UserData.userLastName,
        img: "",
        description: "",
        color: ""
    })

    const [dragY] = useState(new Animated.Value(0))

    const panResponder = useState(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dy: dragY }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dy > 200) {
                    setModalVisible(false)
                } else {
                    Animated.spring(dragY, {
                        toValue: 0,
                        useNativeDriver: false
                    }).start()
                }
            }
        })
    )[0]

    const styles = StyleSheet.create({
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            margin: 0,
            backgroundColor: theme.SecondaryColor,
            borderRadius: 24,
            elevation: 5,
            display: 'flex',
            height: '85%',
            borderWidth: 1,
            borderColor: theme.ThirdColor,
            paddingHorizontal: 10,
            transform: [{ translateY: dragY }]
        },
        draggableHandle: {
            height: 8,
            width: '50%',
            backgroundColor: theme.InvertColor,
            marginTop: 20,
            borderRadius: 8,
            alignSelf: 'center'
        },
        label: {
            fontSize: 24,
            marginVertical: 4,
            color: theme.TextColor
        },
        input: {
            paddingHorizontal: 10,
            height: 50,
            backgroundColor: theme.ThirdColor,
            borderRadius: 4,
            fontSize: 22,
            color: theme.InputTextColor
        },
        image: {
            width: 120,
            aspectRatio: 1,
            borderRadius: 60,
            position: 'absolute',
            right: 16,
            bottom: -40,
            zIndex: 2,
        }
    })

    async function handleSelectImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false) {
            alert("Se necesita permiso para acceder a la galería de imágenes.")
            return
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.4,
            base64: true,
        })

        const timestamp = new Date().getTime()
        const filename = `cropped_image_${timestamp}.jpg`

        if (!pickerResult.canceled) {
            setUrl(pickerResult.assets[0].uri)

            let imageData = {
                name: filename,
                uri: pickerResult.assets[0].uri,
                type: pickerResult.assets[0].mimeType
            }

            setUpdateData({ ...updateData, img: imageData })
        }
    }

    async function UpdateData() {
        setLoading(true)
        const formData = new FormData()
        formData.append('img', updateData.img)
        formData.append('username', updateData.username)
        formData.append('name', updateData.name)
        formData.append('lastname', updateData.lastname)
        formData.append('description', updateData.description)
        formData.append('color', updateData.color)

        const response = await axios.post(`${API_URL}${ENDPOINTS.UpdateUser(UserData.userId)}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

        const data = await response.data
        console.log(data)

        onEdit(true)
        setLoading(false)
        setModalVisible(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={styles.overlay} />
                <Animated.View style={styles.modalView} {...panResponder.panHandlers}>
                    <View style={styles.draggableHandle} />
                    <ScrollView style={{ marginTop: 20, marginHorizontal: 16, paddingTop: 10, borderTopWidth: 1, borderColor: theme.ThirdColor }}>
                        <Text style={{ color: theme.TextColor, fontSize: 30, marginBottom: 16 }}>Editar perfil</Text>

                        <View style={{ width: '100%', aspectRatio: 16 / 7, backgroundColor: favColor ?? UserData.userColor, borderRadius: 8, zIndex: 1, }}>
                            <Image style={{ ...styles.image }} source={{ uri: url ?? UserData.userImg }} />
                            <TouchableOpacity onPress={handleSelectImage} style={{ ...styles.image, backgroundColor: 'gray', diplay: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }} >
                                <CameraIcon size={90} fill={theme.SvgColor} />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ ...styles.label }}>Nombre de usuario</Text>
                        <TextInput
                            onChangeText={(txt) => setUpdateData({ ...updateData, username: txt })}
                            style={{ ...styles.input }}>{user.userNickname}</TextInput>

                        <Text style={{ ...styles.label }}>Nombre</Text>
                        <TextInput
                            onChangeText={(txt) => setUpdateData({ ...updateData, name: txt })}
                            style={{ ...styles.input }}>{user.userName}</TextInput>

                        <Text style={{ ...styles.label }}>Apellido (s)</Text>
                        <TextInput
                            onChangeText={(txt) => setUpdateData({ ...updateData, lastname: txt })}
                            style={{ ...styles.input }}>{user.userLastName}</TextInput>

                        <Text style={{ ...styles.label }}>Descripcion</Text>
                        <TextInput
                            onChangeText={(txt) => setUpdateData({ ...updateData, description: txt })}
                            multiline style={{ ...styles.input, height: 'auto', paddingVertical: 10 }}>{user.userDescription}</TextInput>

                        <Button TextButton="Seleccionar color favorito"
                            ButtonStyle={{
                                borderWidth: 1,
                                borderColor: theme.ThirdColor,
                                backgroundColor: favColor ? favColor : null,
                                height: 40,
                                marginTop: 16
                            }}
                            TextStyle={{ fontSize: 20, color: theme.TextColor }}
                            onPress={() => setColorPicker(true)}
                        />

                        {colorPicker &&
                            <ColorPickerModal setColorPicker={setColorPicker} setFavColor={setFavColor} setUpdateData={setUpdateData} favColor={favColor} />
                        }

                        <View style={{ marginTop: 16, marginBottom: 24, display: 'flex', flexDirection: 'row', gap: 8 }}>
                            <Round
                                onPress={() => setModalVisible(false)}
                                ButtonStyle={{ backgroundColor: 'transparent', borderWidth: 2, borderColor: theme.ThirdColor }}>
                                <Back fill={theme.SvgColor} />
                            </Round>
                            <View style={{ flex: 1 }}>
                                <Button onPress={UpdateData} TextButton="Actualizar perfil" ButtonStyle={{ flex: 1 }} Disabled={loading} />
                            </View>
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    )
}