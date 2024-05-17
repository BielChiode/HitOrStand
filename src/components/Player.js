import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import sumPoints from '../utils/sumPoints'

function Player({ player }) {
  const pontos = sumPoints(player)

  return (
    <View style={styles.playerContainer}>
      <View style={styles.dealerAvatar}>
        <Icon
          raised
          name="user"
          type="font-awesome"
          color="#99CFBD"
          onPress={() => console.log('hello')}
        />
        <Text style={styles.textPoints}>Pontos: {pontos}</Text>
      </View>
      <View style={styles.playerCardsContainer}>
        {player &&
          player.map((card, index) => (
            <Image
              key={index}
              style={[styles.cardImage, { marginLeft: index !== 0 ? -50 : 0 }]}
              source={{
                uri: card.image
              }}
            />
          ))}
      </View>
    </View>
  )
}

export default Player

const styles = StyleSheet.create({
  playerContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  playerCardsContainer: {
    flexDirection: 'row',
    marginBottom: 16
  },
  dealerAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textPoints: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: '#FFF'
  },
  cardImage: {
    width: 110,
    height: 150
  }
})
