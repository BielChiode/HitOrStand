import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'
import 'dotenv/config'

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}
