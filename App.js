import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import MainStack from './src/navigation/Stack'

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <MainStack />
    </SafeAreaView>
  )
}
