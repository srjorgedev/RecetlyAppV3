import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import useDynamicStyles from "../../components/styles/useDynamicStyles"
import Card from "../../components/ui/recipe/Card"
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import useGetFavorites from "../../components/hooks/useGetFavorites"

export default function MyFavoriteScreen() {
    const theme = useDynamicStyles()

    const [recipes, setRecipes] = useState()
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(false)

    async function GetRecipes() {
        setLoading(true)
        const { recipes } = await useGetFavorites()
        setRecipes(recipes)
        setReload(false)
        setLoading(false)
    }

    useEffect(() => {
        GetRecipes()
    }, [reload])

    if (loading && !recipes) {
        return (
            <MainLayout>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={80} />
                </View>
            </MainLayout>
        )
    }

    if (!loading && recipes) {
        return (
            <MainLayout Title="Mis favoritos" back={true}>
                <ScrollView refreshControl={<RefreshControl refreshing={reload} onRefresh={() => setReload(true)} colors={['red', 'purple', 'orange']} />}>
                    {/* Para el menu de opciones -> <View></View> */}
                    {recipes == null && <Text>Este usuario no tiene recetas favoritas</Text>}
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, marginVertical: 24 }}>
                        {recipes &&
                            recipes.map(recipe => {
                                return (
                                    <Card key={recipe.id} Img={recipe.mainImg} Title={recipe.name} />
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </MainLayout>
        )
    }
}