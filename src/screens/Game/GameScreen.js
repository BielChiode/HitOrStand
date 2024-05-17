import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useGetDeck } from '../../api/hooks/useGetDeck'
import { useGetCards } from '../../api/hooks/useGetCards'
import Player from '../../components/Player'
import Dealer from '../../components/Dealer'
import getCards from '../../api/getCards'
import Toast from 'react-native-toast-message'
import sumPoints from '../../utils/sumPoints'
import WinnerModal from '../../components/WinnerModal'

function GameScreen() {
  const [deck, setDeck] = useState(null)
  const [dealer, setDealer] = useState(null)
  const [player, setPlayer] = useState(null)
  const [loadingHit, setLoadingHit] = useState(false)
  const [stand, setStand] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

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

  const handleHit = async () => {
    setLoadingHit(true)
    let pointsDealer = sumPoints(dealer)
    let nCards = pointsDealer >= 17 ? 1 : 2
    try {
      const newCard = await getCards(deck.deck_id, nCards)
      console.log('newCard', newCard)
      setPlayer([...player, newCard.cards[0]])
      if (nCards > 1) {
        setDealer([...dealer, newCard.cards[1]])
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: e,
        topOffset: 60
      })
    } finally {
      setLoadingHit(false)
    }
  }
  const handleHitDealer = async () => {
    setLoadingHit(true)
    try {
      const newCard = await getCards(deck.deck_id, 1)
      setDealer([...dealer, ...newCard.cards])
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: e,
        topOffset: 60
      })
    } finally {
      setLoadingHit(false)
    }
  }

  const handleStand = () => {
    setStand(true)
    // Toast.show({
    //   type: 'success',
    //   text1: 'Hello',
    //   topOffset: 60
    // })
    setModalVisible(true)
  }
  console.log('player', player)

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
          <Dealer dealer={dealer} stand={stand} />

          <Text style={styles.infoText}>Selecione sua próxima ação</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              disabled={loadingHit}
              onPress={handleHit}
              style={styles.button}
            >
              <Text style={styles.buttonText}>HIT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleStand} style={styles.button}>
              <Text style={styles.buttonText}>STAND</Text>
            </TouchableOpacity>
          </View>

          <Player player={player} />
          {modalVisible && (
            <WinnerModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          )}
        </View>
      )}
    </View>
  )
}

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
  infoText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10
  },
  buttonsContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 10,
    paddingHorizontal: 30
  },
  button: {
    backgroundColor: '#FABD07',
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
})
