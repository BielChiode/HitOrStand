import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import somaPontos from '../utils/somaPontos'

function Dealer({ dealer }) {
  const pontos = somaPontos(dealer)
  return (
    <View style={styles.dealerContainer}>
      <View style={styles.dealerCardsContainer}>
        {dealer &&
          dealer.map((card, index) =>
            index == 0 ? (
              <Image
                key={index}
                style={styles.cardImage}
                source={{
                  uri: 'https://deckofcardsapi.com/static/img/back.png'
                }}
              />
            ) : (
              <Image
                key={index}
                style={[styles.cardImage, { marginLeft: -40 }]}
                source={{
                  uri: card.image
                }}
              />
            )
          )}
      </View>
      <View style={styles.dealerAvatar}>
        <Text style={styles.textPoints}>Pontos: {pontos}</Text>
        <Icon
          raised
          name="user"
          type="font-awesome"
          color="#f50"
          onPress={() => console.log('hello')}
        />
      </View>
    </View>
  )
}

export default Dealer

const styles = StyleSheet.create({
  dealerContainer: {
    position: 'absolute',
    top: 0
  },
  dealerCardsContainer: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  cardImage: {
    width: 110,
    height: 150
  },
  dealerAvatar: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  textPoints: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: '#FFF'
  }
})
