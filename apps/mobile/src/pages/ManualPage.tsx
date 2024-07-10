import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { colors } from "common/styles"
import ModePicker from "../widgets/ModePicker"
import { ManualPageNavigationProperties } from "../types/navigationProperties"

const ManualPage: React.FC<ManualPageNavigationProperties> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ManualPage</Text>
      <View>
        <ModePicker navigation={navigation} route={route} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral1000,
    paddingTop: 20,
    alignItems: "center"
  },
  text: {
    color: colors.neutral100
  }
})

export default ManualPage
