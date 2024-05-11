import { useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, View, Text, Image, StyleSheet, Pressable, FlatList } from "react-native"
import useDynamicStyles from "../../components/styles/useDynamicStyles"
import useRecipes from "../../components/hooks/useRecipes"
import MainLayout from "../../components/layout/MainLayout"
import Card from "../../components/ui/recipe/Card"

export default function HomeScreen({ navigation }) {
    const theme = useDynamicStyles()
    const [loading, setLoading] = useState(false)

    const [mex, setMex] = useState()
    const [italiana, setItaliana] = useState()
    const [oriental, setOriental] = useState()
    const [daily, setDaily] = useState()
    const [postres, setPostres] = useState()
    const [drink, setDrink] = useState()

    useEffect(() => {
        GetRecipes()
    }, [])

    async function GetRecipes() {
        setLoading(true)

        const data = await useRecipes()
        const { mex,
            italiana,
            oriental,
            postres,
            drink,
            daily } = data

        setDaily(daily)
        setMex(mex)
        setItaliana(italiana)
        setOriental(oriental)
        setPostres(postres)
        setDrink(drink)

        setLoading(false)
    }

    const styles = StyleSheet.create({
        dailyContainer: {
            flex: 1,
            aspectRatio: 16 / 8,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: theme.ThirdColor,
            display: 'flex',
            overflow: 'hidden',
            justifyContent: 'center'
        },
        dailyText: {
            fontSize: 20,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderWidth: 1,
            borderColor: theme.ThirdColor,
            borderRadius: 8,
            color: theme.TextColor
        }
    })

    return (
        <MainLayout CreateRecipe={true} >
            <ScrollView>
                <Pressable onPress={() => navigation.navigate('Recipe', { id: daily.recipe.id })}>
                    <View key={`DailyRecipe`} style={{ borderBottomWidth: 1, paddingBottom: 10, borderColor: theme.ThirdColor }}>
                        <Text style={{ fontSize: 30, marginTop: 8, marginBottom: 4, color: theme.TextColor }}>Receta del dia</Text>
                        <View style={{ ...styles.dailyContainer }}>
                            {!loading && daily &&
                                <Image style={{ flex: 1 }} source={{ uri: daily.recipe.mainImg }}></Image>
                            }
                            {loading && !daily && <ActivityIndicator size={60} />}
                        </View>
                        <View style={{ gap: 4, marginVertical: 8 }}>
                            <Text numberOfLines={1} style={{ ...styles.dailyText, flex: 1, fontSize: 26 }}>{!loading && daily && `${daily.recipe.name}`}</Text>
                            <Text style={{ ...styles.dailyText, fontSize: 18 }}>{!loading && daily && `Tiempo restante: ${daily.countdown}`}</Text>
                        </View>
                    </View>

                    <Text style={{ fontSize: 30, marginTop: 8, marginBottom: 4, color: theme.TextColor }}>Recetas Mexicanas</Text>
                    <FlatList horizontal={true}
                        contentContainerStyle={{ gap: 8 }}
                        showsHorizontalScrollIndicator={false}
                        data={mex} renderItem={({ item }) => <Card Id={item.id} Title={item.name} Img={item.mainImg} />}
                    />

                    <Text style={{ fontSize: 30, marginTop: 8, marginBottom: 4, color: theme.TextColor }}>Recetas Orientales</Text>
                    <FlatList horizontal={true}
                        contentContainerStyle={{ gap: 8 }}
                        showsHorizontalScrollIndicator={false}
                        data={oriental} renderItem={({ item }) => <Card Id={item.id} Title={item.name} Img={item.mainImg} />}
                    />

                    <Text style={{ fontSize: 30, marginTop: 8, marginBottom: 4, color: theme.TextColor }}>Recetas Italianas</Text>
                    <FlatList horizontal={true}
                        contentContainerStyle={{ gap: 8 }}
                        showsHorizontalScrollIndicator={false}
                        data={italiana} renderItem={({ item }) => <Card Id={item.id} Title={item.name} Img={item.mainImg} />}
                    />

                    <Text style={{ fontSize: 30, marginTop: 8, marginBottom: 4, color: theme.TextColor }}>Postres</Text>
                    <FlatList horizontal={true}
                        contentContainerStyle={{ gap: 8 }}
                        showsHorizontalScrollIndicator={false}
                        data={postres} renderItem={({ item }) => <Card Id={item.id} Title={item.name} Img={item.mainImg} />}
                    />

                    <Text style={{ fontSize: 30, marginTop: 8, marginBottom: 4, color: theme.TextColor }}>Bebidas</Text>
                    <FlatList horizontal={true}
                        contentContainerStyle={{ gap: 8 }}
                        showsHorizontalScrollIndicator={false}
                        data={drink} renderItem={({ item }) => <Card Id={item.id} Title={item.name} Img={item.mainImg} />}
                    />
                </Pressable>
            </ScrollView>
        </MainLayout>
    )
}