import { useState, useEffect } from "react"
import { Animated, Modal, PanResponder, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import useDynamicStyles from "../styles/useDynamicStyles"
import Round from "../ui/button/Round"
import Back from "../svg/Back"
import useAddComment from "../hooks/useAddComment"
import CommentCard from "../ui/recipe/CommentCard"
import AlertNotification from "../notification/Alert"
import useGetComments from "../hooks/useGetComments"

export default function CommentsModal({ recipeId, userId, prevComments, modalVisible, setModalVisible, onPost }) {
    const theme = useDynamicStyles()
    const [user, setUser] = useState(userId)
    const [recipe, setRecipe] = useState(recipeId)
    const [comment, setComment] = useState()
    const [uploading, setUploading] = useState(false)
    const [reload, setReload] = useState(false)
    const [comments, setComments] = useState(prevComments)

    const [callAlert, setCallAlert] = useState({
        call: false,
        message: '',
        variant: ''
    })

    const [dragY] = useState(new Animated.Value(0))

    async function GetComments() {
        const { comments } = await useGetComments(recipe)
        setComments(comments)
        setReload(false)
    }

    useEffect(() => {
        GetComments()
    }, [reload])

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

    async function PostComment() {
        setUploading(true)
        const { message, status } = await useAddComment(user, recipe, comment)
        setCallAlert({
            message: message,
            variant: status == "Ok" ? 'success' : 'warn',
            call: true
        })
        setUploading(false)
        setReload(true)
    }

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
            width: '30%',
            backgroundColor: theme.InvertColor,
            borderRadius: 8,
            alignSelf: 'center'
        },
        input: {
            height: 'auto',
            backgroundColor: theme.ThirdColor,
            flex: 1, fontSize: 18,
            paddingLeft: 8,
            borderRadius: 4,
            maxHeight: 80,
            paddingVertical: 8
        },
        commentInputContainer: {
            minHeight: 70,
            diplay: 'flex',
            flexDirection: 'row',
            borderTopWidth: 1,
            borderColor: theme.ThirdColor,
            alignItems: 'center',
            gap: 8,
            height: 'auto',
            paddingVertical: 8
        }
    })

    return (
        <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={styles.overlay} />
                <Animated.View style={styles.modalView} >
                    <View style={{ paddingVertical: 20 }} {...panResponder.panHandlers}>
                        <View style={styles.draggableHandle} />
                    </View>
                    <ScrollView style={{ marginHorizontal: 8, paddingTop: 10, borderTopWidth: 1, borderColor: theme.ThirdColor }}>
                        <Text style={{ color: theme.TextColor, fontSize: 20, marginBottom: 10 }}>
                            <Text style={{ fontWeight: '600' }}>Comentarios</Text> {comments[0] == null ? '0' : comments.length}
                        </Text>

                        {comments[0] == null && <Text style={{ color: theme.TextColor, fontSize: 20, marginBottom: 10 }}>Esta receta no tiene comentarios</Text>}
                        <View style={{ gap: 8, marginBottom: 24 }}>
                            {comments.length > 0 && comments.map(c => {
                                return (
                                    <CommentCard key={`${c.createdAt}-${c.owner.id}`} c={c} />
                                )
                            })}
                        </View>
                    </ScrollView>
                    <View style={{ ...styles.commentInputContainer }}>
                        <TextInput multiline style={{ ...styles.input }} placeholder="Agrega un comentario" onChangeText={(txt) => setComment(txt)} />
                        <Round ButtonStyle={{ transform: [{ rotate: '180deg' }] }} onPress={PostComment} Disabled={uploading}>
                            <Back fill={theme.SvgColor} />
                        </Round>
                    </View>
                    {callAlert.call && <AlertNotification Message={callAlert.message} icon={callAlert.variant} OnEnd={setCallAlert} />}
                </Animated.View>
            </View>
        </Modal>
    )
}