import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StartScreen from '../screens/start/StartScreen'
import LogIn from '../screens/start/LogInScreen'
import DrawerNavigation from './Drawer'
import LoadingDataScreen from '../screens/LoadingDataScreen'
import SignUp from "../screens/start/SignUp"

const Stack = createNativeStackNavigator()

export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen component={LoadingDataScreen} name="Loading" />
                <Stack.Screen component={StartScreen} name="StartScreen" />
                <Stack.Screen component={LogIn} name="LogIn" />
                <Stack.Screen component={DrawerNavigation} name='Drawer' />
                <Stack.Screen component={SignUp} name="SignUp" />
            </Stack.Navigator>
        </NavigationContainer>
    )
}