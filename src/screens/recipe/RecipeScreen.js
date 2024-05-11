import { View, ScrollView, Text, ActivityIndicator, Image, RefreshControl, StyleSheet, Pressable } from "react-native"
import Button from "../../components/ui/button/Button"
import Round from "../../components/ui/button/Round"
import useDynamicStyles from "../../components/styles/useDynamicStyles"
import { useEffect, useState } from "react"
import useGetRecipe from "../../components/hooks/useGetRecipe"
import MainLayout from "../../components/layout/MainLayout"
import FavoriteSvg from "../../components/svg/Favorite"
import AlertNotification from "../../components/notification/Alert"
import useAddFavorite from "../../components/hooks/useAddFavorite"
import useDeleteFavorite from "../../components/hooks/useDeleteFavorite"
import CommentsModal from "../../components/modal/CommentsModal"
import CommentCard from "../../components/ui/recipe/CommentCard"

export default function RecipeScreen({ route }) {
    const { id } = route.params
    const theme = useDynamicStyles()

    const [recipe, setRecipe] = useState()
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [user, setUser] = useState()
    const [favorite, setFavorite] = useState()
    const [actionFavorite, setActionFavorite] = useState(false)
    const [comment, setComment] = useState()
    const [commentModal, setCommentModal] = useState(false)

    const [callAlert, setCallAlert] = useState({
        call: false,
        message: '',
        variant: ''
    })

    async function GetRecipe() {
        setLoading(true)
        const { recipe, user, isFavorite, comments } = await useGetRecipe(id)

        setRecipe(recipe)
        setUser(user)
        setFavorite(isFavorite)
        setComment(comments)
        setLoading(false)
        setReload(false)
    }
    useEffect(() => {
        GetRecipe()
    }, [id, reload])

    const styles = StyleSheet.create({
        image: {
            flex: 1,
            aspectRatio: 16 / 9,
        },
        description: {
            fontSize: 18,
            paddingHorizontal: 8,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: theme.ThirdColor,
            color: theme.TextColor,
            borderRadius: 8
        },
        noFavorite: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: theme.MainButtonBackgroundColor
        },
        siFavorite: {
            backgroundColor: theme.MainButtonBackgroundColor
        },
        title: {
            fontSize: 26,
            color: theme.TextColor,
            fontWeight: '500',
            marginVertical: 8
        },
        tag: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: theme.MainButtonBackgroundColor
        }
    })

    async function AddFavorite() {
        setActionFavorite(true)
        if (!favorite) {
            const { message, status } = await useAddFavorite(user, id)
            setCallAlert({
                message: message,
                variant: status == "Ok" ? 'success' : 'warn',
                call: true
            })
            setFavorite(true)
        } else {
            const { message, status } = await useDeleteFavorite(user, id)
            setCallAlert({
                message: message,
                variant: status == "Ok" ? 'success' : 'warn',
                call: true
            })
            setFavorite(false)
        }
        setActionFavorite(false)
    }

    if (loading || !recipe || reload) {
        <MainLayout>
            <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={100} />
            </View>
        </MainLayout>
    }

    if (!loading && recipe) {
        return (
            <MainLayout Title="Receta" back>
                <ScrollView refreshControl={<RefreshControl refreshing={reload} onRefresh={() => setReload(true)} colors={['red', 'purple', 'orange']} />}>
                    <View style={{ borderWidth: 1, borderColor: theme.ThirdColor, marginTop: 16, marginBottom: 8, borderRadius: 8, overflow: 'hidden' }}>
                        <Image style={{ ...styles.image }} source={{ uri: recipe.mainImg }} />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <View>
                            <Text style={{ fontSize: 28, color: theme.TextColor, fontWeight: '700' }}>{recipe.name}</Text>
                            <Text style={{ fontSize: 22, color: theme.TextColor, textDecorationLine: 'underline' }}>{recipe.owner.username}</Text>
                        </View>
                        <View style={{ marginRight: 8 }}>
                            <Round ButtonStyle={favorite ? styles.siFavorite : styles.noFavorite} Disabled={actionFavorite} onPress={AddFavorite}>
                                <FavoriteSvg fill={theme.SvgColor} color={favorite ? theme.SvgColor : 'transparent'} />
                            </Round>
                        </View>
                    </View>
                    <Text style={styles.title}>Descripcion</Text>
                    <Text style={{ ...styles.description }}>{recipe.description ?? "Esta receta no cuenta con descripcion"}</Text>

                    {user == recipe.owner.id && <Button TextButton="Editar receta" ButtonStyle={{ marginVertical: 16 }} />}

                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ ...styles.title, marginTop: 0 }}>{recipe.category.count > 2 ? "Categorias" : "Categoria"}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                            {recipe.category.tags.map(tag => {
                                return (
                                    <View key={`CAT-${tag.key}-${tag.value}`} style={{ ...styles.tag }}>
                                        <Text style={{ color: theme.TextColor, fontSize: 20 }}>{tag.value}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ ...styles.title, marginTop: 0 }}>{recipe.tag.count > 2 ? "Etiquetas" : "Etiqueta"}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                            {recipe.tag.tags.map(tag => {
                                return (
                                    <View key={`TAG-${tag.key}-${tag.value}`} style={{ ...styles.tag }}>
                                        <Text style={{ color: theme.TextColor, fontSize: 20 }}>{tag.value}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                    <View>
                        <Text style={styles.title}>Tiempo aproximado de preparacion</Text>
                        <Text style={{ color: theme.TextColor, paddingHorizontal: 8, paddingVertical: 8, fontSize: 20, textAlign: 'center', borderWidth: 1, borderColor: theme.ThirdColor, borderRadius: 4 }}>
                            {"De " + recipe.time.from.toLowerCase() + " a " + recipe.time.to.toLowerCase()}
                        </Text>
                    </View>

                    <View style={{ marginTop: 8, marginBottom: 16 }}>
                        <Text style={styles.title}>Ingredientes</Text>
                        <Text style={{ fontSize: 20, color: theme.TextColor, marginBottom: 8 }}>Esta receta requiere de aproximadamente {recipe.ingredients.count}, los cuales son:</Text>

                        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                            {recipe.ingredients.ingredients.map(tag => {
                                return (
                                    <View key={`INGREDIENT-${tag.amount}-${tag.name}`} style={{ ...styles.tag, paddingHorizontal: 6 }}>
                                        <Text style={{ color: theme.TextColor, fontSize: 12 }}>
                                            {tag.amount + " " + tag.unit.value.toLowerCase() + " de " + tag.name.toLowerCase()}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                    <View style={{ marginBottom: 16 }}>
                        <Text style={styles.title}>Pasos</Text>
                        <Text style={{ fontSize: 20, color: theme.TextColor, marginBottom: 8 }}>Esta receta requiere de aproximadamente {recipe.steps.count} pasos:</Text>

                        <View style={{ gap: 8 }}>
                            {recipe.steps.steps.map((tag, i) => {
                                return (
                                    <View key={`STEP-${i}`} style={{ ...styles.tag, paddingHorizontal: 6, borderColor: theme.ThirdColor, backgroundColor: theme.ThirdColor }}>
                                        <Text style={{ color: theme.TextColor, fontSize: 18 }}>
                                            {i}.- {tag}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                    <Pressable onPress={() => setCommentModal(true)}>
                        <View style={{ marginTop: 8, marginBottom: 16 }}>
                            <Text style={styles.title}>Comentarios - {comment[0] == null ? "0" : comment.length}</Text>
                            <View style={{ flex: 1, height: 'auto', borderRadius: 8, backgroundColor: theme.ThirdColor, paddingHorizontal: 8, paddingVertical: 16, gap: 8 }}>
                                {comment[0] == null && <Text style={{ fontSize: 18, color: theme.TextColor }}>Esta receta no tiene comentarios</Text>}
                                {comment.length > 1 && comment.slice(0, 2).map(c => {
                                    return (
                                        <CommentCard bC={theme.MainBackgroundColor} key={`${c.createdAt}-${c.owner.id}`} c={c} />
                                    )
                                })}
                            </View>
                        </View>
                    </Pressable>

                    {commentModal && <CommentsModal prevComments={comment} modalVisible={commentModal} setModalVisible={setCommentModal} recipeId={id} userId={user} />}

                    <View style={{ marginVertical: 8 }} />
                    {callAlert.call && <AlertNotification Message={callAlert.message} icon={callAlert.variant} OnEnd={setCallAlert} />}
                </ScrollView>
            </MainLayout>
        )
    }
}
