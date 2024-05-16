import * as React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

// TODO remove the { navigation: any }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DetailsScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
