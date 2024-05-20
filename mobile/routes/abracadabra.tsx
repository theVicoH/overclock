/* eslint-disable no-console */
import * as React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { AbracadabraNavigationProperties } from '../types/navigation-properties'
import { ReactNativeJoystick } from '@korsolutions/react-native-joystick'

export default function AbracadabraScreen({ navigation }: AbracadabraNavigationProperties) {
  return (
    <View style={styles.container}>
      <Text>Abracadabra Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <ReactNativeJoystick color="#06b6d4" radius={75} onMove={(data) => console.log(data)} />
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
