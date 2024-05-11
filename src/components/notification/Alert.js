import React, { useState, useEffect } from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native'
import CloseDrawer from '../svg/CloseDrawer'
import useDynamicStyles from '../styles/useDynamicStyles'
import WarnIcon from '../svg/Warn'
import SuccessIcon from '../svg/Success'

export default function AlertNotification({ Message, OnEnd, icon }) {
    const [modalVisible, setModalVisible] = useState(true)
    const theme = useDynamicStyles()

    function timerClose() {
        setTimeout(() => {
            OnEnd({ call: false })
        }, 1700)
    }

    useEffect(() => {
        timerClose()
    }, [])

    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        modalView: {
            margin: 16,
            backgroundColor: theme.SecondaryColor,
            borderRadius: 30,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            display: 'flex',
            flexDirection: 'row',
            height: 60,
            justifyContent: 'space-between'
        },
        modalText: {
            color: theme.TextColor,
            fontSize: 18,
        },
    })

    const iconVariant = {
        warn: <WarnIcon fill={theme.SvgColor} />,
        success: <SuccessIcon fill={theme.SvgColor} />
    }

    return (
        <View style={{}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.')
                    setModalVisible(!modalVisible)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ marginLeft: 8 }}>
                            {iconVariant[icon]}
                        </View>

                        <Text style={styles.modalText}>{Message}</Text>

                        <Pressable
                            style={{ backgroundColor: theme.MainBackgroundColor, padding: 4, borderRadius: 50, marginRight: 8 }}
                            onPress={() => OnEnd({ call: false })}>
                            <CloseDrawer fill={theme.SvgColor} />
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
