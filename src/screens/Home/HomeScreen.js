import { Button, Image, StyleSheet, Text, View } from 'react-native'
import logo from '../../../assets/logo.png'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={logo} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonStart}
          onPress={() => navigation.navigate('Game')}
          title="Iniciar jogo"
          color="#99CFBD"
          accessibilityLabel="Iniciar jogo"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2
  },
  image: {
    width: 300,
    height: 300
  },
  buttonContainer: {
    flex: 1,
    width: 250,
    height: 200,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})
