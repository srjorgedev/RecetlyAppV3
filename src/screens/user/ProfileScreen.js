import { View, Image, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import useDynamicStyles from '../../components/styles/useDynamicStyles'
import MainLayout from '../../components/layout/MainLayout'
import Button from "../../components/ui/button/Button"
import isLogged from "../../components/hooks/isLogged"
import { useEffect, useState } from "react"
import EditProfileModal from "../../components/modal/EditProfileModal"
import Card from "../../components/ui/recipe/Card"
import useGetRecipes from "../../components/hooks/useGetRecipes"
import LoadingProfile from "../../components/loading/LoadingProfile"
import useGetFavorites from "../../components/hooks/useGetFavorites"

export default function ProfileScreen({ navigation }) {
    const theme = useDynamicStyles()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [showEditProfile, setShowEditProfile] = useState(false)
    const [recipes, setRecipes] = useState()
    const [favorites, setFavorites] = useState()

    async function GetData() {
        setReload(false)
        setLoading(true)
        const { data, logged } = await isLogged()
        const { recipes } = await useGetRecipes()
        const { recipes: favorites } = await useGetFavorites()

        setUser(data)
        setLoading(false)
        setRecipes(recipes.slice(0, 4))
        setFavorites(favorites.slice(0, 4))
    }

    useEffect(() => {
        GetData()
    }, [reload])

    const styles = StyleSheet.create({
        imageContainer: {
            width: '100%',
            aspectRatio: 16 / 6,
            borderWidth: 1,
            borderColor: theme.ThirdColor,
            marginTop: 10,
            borderRadius: 8,
            zIndex: 1
        },
        dataContainer: {
            gap: 4,
            paddingHorizontal: 10,
            paddingVertical: 16,
            borderWidth: 1,
            borderColor: theme.ThirdColor,
            borderRadius: 8,
            marginTop: 10,
            marginBottom: 16
        },
        descContainer: {
            paddingHorizontal: 10,
            paddingVertical: 16,
            borderWidth: 1,
            borderColor: theme.ThirdColor,
            borderRadius: 8,
            marginTop: 10,
            marginBottom: 16
        },
        image: {
            width: 120,
            aspectRatio: 1,
            borderRadius: 60,
            position: 'absolute',
            right: 16,
            bottom: -40,
            zIndex: 2,
        },
        recipesContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 4,
            borderWidth: 1,
            borderColor: theme.ThirdColor,
            borderRadius: 16,
            justifyContent: 'center',
            paddingVertical: 8,
            marginBottom: 16
        }
    })

    if (loading || !user) {
        return (
            <MainLayout back Title="Perfil">
                <LoadingProfile />
            </MainLayout>
        )
    }

    if (user && !loading) {
        return (
            <MainLayout back={true} Title="Perfil">
                <ScrollView>
                    <View style={{ ...styles.imageContainer, backgroundColor: user.userColor }}>
                        <Image source={{ uri: user.userImg }} style={{ ...styles.image }} />
                    </View>
                    <View style={{ ...styles.dataContainer }}>
                        <Text style={{ color: theme.TextColor, fontSize: 26 }}>{user.userNickname}</Text>
                        <Text style={{ color: theme.TextColor, fontSize: 20 }}>{user.userName + " " + user.userLastName}</Text>
                    </View>
                    <Text style={{ color: theme.TextColor, fontSize: 26 }}>Sobre mi</Text>
                    <View style={{ ...styles.descContainer }}>
                        <Text style={{ color: theme.TextColor, fontSize: 20 }}>{user.userDescription}</Text>
                    </View>

                    <Button TextButton="Editar perfil" ButtonStyle={{ marginBottom: 16 }} onPress={() => setShowEditProfile(true)} />
                    {showEditProfile && <EditProfileModal onEdit={setReload} modalVisible={showEditProfile} setModalVisible={setShowEditProfile} UserData={user} />}

                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text style={{ color: theme.TextColor, fontSize: 26 }}>Recetas</Text>
                            <Pressable onPress={() => navigation.navigate('MyRecipes')}>
                                <Text style={{ color: theme.TextColor, fontSize: 26, textDecorationLine: 'underline' }}>Ver todas</Text>
                            </Pressable>
                        </View>
                        <View style={styles.recipesContainer}>
                            {recipes == null && <Text>Este usuario no tiene recetas</Text>}
                            {recipes &&
                                recipes.map(recipe => {
                                    return (
                                        <Card Id={recipe.id} key={recipe.id} Img={recipe.mainImg} Title={recipe.name} />
                                    )
                                })
                            }
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            <Text style={{ color: theme.TextColor, fontSize: 26 }}>Favoritos</Text>
                            <Pressable onPress={() => navigation.navigate('MyRecipes')}>
                                <Text style={{ color: theme.TextColor, fontSize: 26, textDecorationLine: 'underline' }}>Ver todas</Text>
                            </Pressable>
                        </View>
                        <View style={{ ...styles.recipesContainer, marginBottom: 24 }}>
                            {favorites == null && <Text>Este usuario no tiene recetas favoritas</Text>}
                            {favorites &&
                                favorites.map(recipe => {
                                    return (
                                        <Card Id={recipe.id} key={recipe.id} Img={recipe.mainImg} Title={recipe.name} />
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            </MainLayout>
        )
    }
}