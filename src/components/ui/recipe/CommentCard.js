import { View, Text, Image, StyleSheet } from "react-native"
import useDynamicStyles from "../../styles/useDynamicStyles"

export default function CommentCard({ c, bC }) {
    const theme = useDynamicStyles()

    const styles = StyleSheet.create({
        userInfo: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8
        },
        img: {
            width: 20,
            aspectRatio: 1,
            borderRadius: 10
        },
        title: {
            color: theme.TextColor,
            fontSize: 18,
            fontWeight: '600'
        },
        commentText: {
            fontSize: 16,
            color: theme.TextColor,
        },
        commentTextContainer: {
            marginLeft: 28
        },
        commentContainer: {
            paddingVertical: 8,
            paddingHorizontal: 8,
            borderWidth: 1,
            borderColor: bC ?? theme.ThirdColor,
            borderRadius: 4
        }
    })

    function GetDate() {
        const ActualDate = new Date()
        const CommentDate = new Date(c.createdAt)
        const Diff = Math.abs(ActualDate - CommentDate)

        const minutos = Math.floor(Diff / (1000 * 60));
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        if (dias > 1) return `hace ${dias} días`
        if (dias == 1) return `Ayer`

        if (horas > 2) return `hace ${horas} horas`
        if (horas == 1) return `hace ${horas} hora`

        if (minutos >= 2) return `hace ${minutos} minutos`
        if (minutos < 2) return `Reciente`
    }

    const date = GetDate()

    return (
        <View style={styles.commentContainer}>
            <View style={{ ...styles.userInfo }}>
                <Image source={{ uri: c.owner.img }} style={{ ...styles.img }} />
                <Text style={styles.title}>{c.owner.username}</Text>
                <Text style={{ ...styles.title, fontWeight: '400' }}>- {date}</Text>
            </View>
            <View style={styles.commentTextContainer}>
                <Text style={styles.commentText}>{c.comment}</Text>
            </View>
        </View >
    )
}