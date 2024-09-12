import React from "react"
import { View, StyleSheet } from "react-native"
import Joystick from "../components/Joystick"
import BuzzerButton from "../widgets/BuzzerButton"
import Header from "../widgets/Header"
import { colors } from "common/styles"
import { ManualPageProps } from "../types/navigationProperties"

const ManualPage = ({ navigation }: ManualPageProps) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.controls}>
        <Joystick />
        <BuzzerButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.neutral1000,
  },
  controls: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 80,
    paddingBottom: 48
  }
})

export default ManualPage;
