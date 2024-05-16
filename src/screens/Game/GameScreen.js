import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useGetDeck } from '../../api/hooks/useGetDeck'

function GameScreen() {
  const { data, loading, error } = useGetDeck()
  console.log(loading)
  console.log(data)
  return (
    <View style={styles.container}>
      <Text>GameScreen</Text>
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
  }
})
