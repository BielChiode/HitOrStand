import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'
import Toast from 'react-native-toast-message'

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
      <Toast />
    </NavigationContainer>
  )
}
