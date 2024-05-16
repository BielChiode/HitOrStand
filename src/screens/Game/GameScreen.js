import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useGetDeck } from '../../api/hooks/useGetDeck'
import { useGetCards } from '../../api/hooks/useGetCards'
import Player from '../../components/Player'
import Dealer from '../../components/Dealer'

function GameScreen() {
  const [deck, setDeck] = useState(null)
  const [dealer, setDealer] = useState(null)
  const [player, setPlayer] = useState(null)

  const { data, loading, error } = useGetDeck()

  const {
    data: cards,
    loading: loadingCard,
    error: errorCards
  } = useGetCards(deck?.deck_id, 4)

  useEffect(() => {
    if (data) {
      setDeck(data)
    }
    if (cards) {
      setDealer([cards.cards[0], cards.cards[1]])
      setPlayer([cards.cards[2], cards.cards[3]])
    }
  }, [data, cards])

  console.log('player', player)
  console.log('dealer', dealer)
  console.log(deck)
  return (
    <View style={styles.container}>
      {loading || loadingCard ? (
        <View>
          <Text style={styles.loadingText}>Distribuindo cartas...</Text>
          <ActivityIndicator
            accessible={true}
            accessibilityLabel={'Carregando'}
            size="large"
            color="#FFF"
          />
        </View>
      ) : (
        <View style={styles.gameContainer}>
          <Dealer dealer={dealer} />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => console.log('Hit')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>HIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('STAND')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>STAND</Text>
            </TouchableOpacity>
          </View>

          <Player player={player} />
        </View>
      )}
    </View>
  )
}

// [
//   {
//     code: '2H',
//     image: 'https://deckofcardsapi.com/static/img/2H.png',
//     images: {
//       png: 'https://deckofcardsapi.com/static/img/2H.png',
//       svg: 'https://deckofcardsapi.com/static/img/2H.svg'
//     },
//     suit: 'HEARTS',
//     value: '2'
//   },
//   {
//     code: '8S',
//     image: 'https://deckofcardsapi.com/static/img/8S.png',
//     images: {
//       png: 'https://deckofcardsapi.com/static/img/8S.png',
//       svg: 'https://deckofcardsapi.com/static/img/8S.svg'
//     },
//     suit: 'SPADES',
//     value: '8'
//   }
// ]

export default GameScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#32a852'
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF'
  },
  gameContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    borderWidth: 2
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center', // Alinha o texto ao centro do botão
    fontWeight: 'bold'
  }
})
