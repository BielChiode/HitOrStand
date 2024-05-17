import React from 'react'
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

function WinnerModal({ modalVisible, setModalVisible }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        setModalVisible(!modalVisible)
      }}
      style={styles.modal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Dealer ganhou</Text>
          <Text style={styles.modalText}>Deseja iniciar um novo jogo ?</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonRestart]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
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
    height: 200,
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
