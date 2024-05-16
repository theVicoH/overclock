import * as React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { HomeNavigationProperties } from '../types/navigation-properties'

export default function HomeScreen({ navigation }: HomeNavigationProperties) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Abracadabra"
        onPress={() => navigation.navigate('Abracadabra')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
