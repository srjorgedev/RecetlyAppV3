import { useNavigation } from "@react-navigation/native"
import Constants from 'expo-constants'
import { StyleSheet, Text, View } from "react-native"
import useDynamicStyles from "../styles/useDynamicStyles"
import ShowDrawer from '../svg/ShowDrawer'
import Round from "../ui/button/Round"
import Add from '../svg/AddRecipe'
import Search from '../svg/Search'
import Back from '../svg/Back'

export default function MainLayout({ children, CreateRecipe = false, back = false, Title = "RECETLY" }) {
    const theme = useDynamicStyles()
    const StatusBarHeight = Constants.statusBarHeight
    const navigation = useNavigation()

    const styles = StyleSheet.create({
        header: {
            marginTop: StatusBarHeight,
            height: 60,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: theme.ThirdColor
        },
        container: {
            flex: 1,
            backgroundColor: theme.MainBackgroundColor
        },
        title: {
            fontSize: 45,
            color: theme.TextColor,
            fontWeight: '700'
        },
        content: {
            flex: 1,
            backgroundColor: theme.SecondaryColor, 
            paddingHorizontal: 10
        }
    })

    return (
        <View style={{ ...styles.container }}>
            <View style={{ ...styles.header }}>
                {!back &&
                    <Round ButtonStyle={{ marginLeft: 8, backgroundColor: 'transparent' }} >
                        <Search stroke={theme.SvgColor} />
                    </Round>
                }
                {back &&
                    <Round ButtonStyle={{ marginLeft: 8, backgroundColor: 'transparent' }} onPress={() => navigation.goBack()}>
                        <Back fill={theme.SvgColor} />
                    </Round>
                }
                <Text style={{ ...styles.title }}>{Title}</Text>
                <Round onPress={() => navigation.openDrawer()} ButtonStyle={{ marginRight: 8, backgroundColor: 'transparent' }}>
                    <ShowDrawer stroke={theme.SvgColor} />
                </Round>
            </View>
            <View style={{ ...styles.content }}>
                {children}
            </View>
            {CreateRecipe &&
                <View style={{ position: 'absolute', bottom: 32, right: 16 }}>
                    <Round ButtonStyle={{ width: 80, borderRadius: 20 }} ToScale={0.9}>
                        <Add fill={theme.SvgColor} size={40} />
                    </Round>
                </View>
            }

        </View >
    )
}