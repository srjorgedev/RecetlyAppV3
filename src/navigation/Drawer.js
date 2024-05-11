import AsyncStorage from "@react-native-async-storage/async-storage"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import Constants from 'expo-constants'
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import useDynamicStyles from "../components/styles/useDynamicStyles"
import CloseDrawer from "../components/svg/CloseDrawer"
import HomeSvg from '../components/svg/Home'
import Profile from '../components/svg/Profile'
import Round from "../components/ui/button/Round"
import HomeScreen from "../screens/home/HomeScreen"
import MyRecipes from '../components/svg/MyRecipes'
import FavoriteSvg from "../components/svg/Favorite"
import SettingsSvg from "../components/svg/Settings"
import LogInSvg from '../components/svg/LogIn'
import LogOut from '../components/svg/LogOut'
import ProfileScreen from "../screens/user/ProfileScreen"
import MyRecipesScreen from "../screens/user/MyrRecipeScreen"
import MyFavoriteScreen from "../screens/user/MyFavoriteScreen"
import RecipeScreen from "../screens/recipe/RecipeScreen"

const Drawer = createDrawerNavigator()

function CustomDrawer(props) {
    const [logged, setLogged] = useState()
    const theme = useDynamicStyles()

    const StatusBarH = Constants.statusBarHeight

    useEffect(() => {
        isLogged()
    }, [])

    async function isLogged() {
        try {
            const UserId = await AsyncStorage.getItem('UserId')
            if (UserId == "NOT-LOGGED") {
                return setLogged(false)
            }
            return setLogged(true)
        } catch (error) {
            console.log(error)
        }
    }

    const styles = StyleSheet.create({
        drawer: {
            flex: 1,
            backgroundColor: theme.MainBackgroundColor,
            marginTop: 0,
            paddingTop: 0,
            display: 'flex',
            justifyContent: 'space-between'
        },
        label: {
            fontSize: 22,
            marginHorizontal: -16,
            color: theme.LabelColor
        },
        close: {
            marginTop: StatusBarH,
            paddingHorizontal: 10,
            marginBottom: 10
        },
        item: {
            backgroundColor: theme.DrawerItemBackgroundColor
        }
    })

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ ...styles.drawer }}>
            <View>
                <View style={styles.close}>
                    <Round onPress={() => props.navigation.closeDrawer()} ButtonStyle={{ backgroundColor: 'transparent' }}>
                        <CloseDrawer fill={theme.SvgColor} />
                    </Round>
                </View>
                <DrawerItem
                    style={{ ...styles.item }}
                    labelStyle={styles.label}
                    label="Pagina principal"
                    onPress={() => props.navigation.navigate('Home')}
                    icon={() => <HomeSvg fill={theme.SvgColor} />} />
                <DrawerItem
                    style={{ ...styles.item }}
                    labelStyle={styles.label}
                    label="Perfil"
                    onPress={() => props.navigation.navigate('Profile')}
                    icon={() => <Profile fill={theme.SvgColor} />} />
                <DrawerItem
                    style={{ ...styles.item }}
                    labelStyle={styles.label}
                    label="Mis recetas"
                    onPress={() => props.navigation.navigate('MyRecipes')}
                    icon={() => <MyRecipes fill={theme.SvgColor} />} />
                <DrawerItem
                    style={{ ...styles.item }}
                    labelStyle={styles.label}
                    label="Favoritos"
                    onPress={() => props.navigation.navigate('MyFavorites')}
                    icon={() => <FavoriteSvg fill={theme.SvgColor} />} />
                <DrawerItem
                    style={{ ...styles.item }}
                    labelStyle={styles.label}
                    label="Configuracion"
                    onPress={() => props.navigation.navigate('Home')}
                    icon={() => <SettingsSvg fill={theme.SvgColor} />} />
            </View>

            {
                !logged &&
                <DrawerItem
                    style={{ ...styles.item, marginBottom: 50 }}
                    labelStyle={styles.label}
                    label="Entrar"
                    onPress={() => {
                        AsyncStorage.removeItem('UserId')
                        props.navigation.navigate('StartScreen')
                    }}
                    icon={() => <LogInSvg fill={theme.SvgColor} />} />
            }
            {
                logged &&
                <DrawerItem
                    style={{ ...styles.item, marginBottom: 50 }}
                    labelStyle={styles.label}
                    label="Cerrar sesion"
                    onPress={() => {
                        AsyncStorage.removeItem('UserId')
                        props.navigation.navigate('StartScreen')
                    }
                    }
                    icon={() => <LogOut color={theme.SvgColor} />} />
            }
        </DrawerContentScrollView >
    )
}

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false, drawerPosition: "right" }}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen component={HomeScreen} name="Home" />
            <Drawer.Screen component={ProfileScreen} name="Profile" />
            <Drawer.Screen component={MyRecipesScreen} name="MyRecipes" />
            <Drawer.Screen component={MyFavoriteScreen} name="MyFavorites" />
            <Drawer.Screen component={RecipeScreen} name="Recipe" />
        </Drawer.Navigator>
    )
}