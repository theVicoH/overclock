import * as React from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { DetailsNavigationProperties } from "../types/navigation-properties"

export default function DetailsScreen({ navigation }: DetailsNavigationProperties) {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Abracadabra"
        onPress={() => navigation.navigate("Abracadabra")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
