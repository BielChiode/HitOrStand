import React from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import { StackActions } from '@react-navigation/native'

function WinnerModal({ navigation, modal, setModal }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal.visible}
      onRequestClose={() => {
        setModal({ visible: !modal.visible, winnerText: null })
      }}
      style={styles.modal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{modal.winnerText}</Text>
          <Text style={styles.modalText}>Deseja iniciar um novo jogo ?</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModal({ visible: !modal.visible, winnerText: null })
                navigation.navigate('Home')
              }}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonRestart]}
              onPress={() => {
                setModal({ visible: !modal.visible, winnerText: null })
                navigation.dispatch(StackActions.replace('Game'))
              }}
            >
              <Text style={styles.textStyle}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

WinnerModal.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func
  }).isRequired,
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    winnerText: PropTypes.string
  }).isRequired,
  setModal: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  modal: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    width: '70%',
    height: 250,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row'
  },
  button: {
    borderRadius: 10,
    width: 90,
    padding: 10,
    elevation: 2
  },
  buttonRestart: {
    backgroundColor: '#E84233',
    marginLeft: 10
  },
  buttonClose: {
    backgroundColor: '#000'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center'
  }
})

export default WinnerModal
