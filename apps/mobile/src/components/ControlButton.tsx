import React from "react"
import { View, StyleSheet } from "react-native"
import { colors } from "common/styles"
import { ArrowsMove } from "common/icons/mobile"

const ControlButton = () => {
  return (
    <View style={styles.joysticControllerDefault}>
      <ArrowsMove stroke={colors.primary600} />
    </View>
  )
}

const styles = StyleSheet.create({
  joysticControllerDefault: {
    height: 52,
    width: 52,
    borderRadius: 28,
    backgroundColor: colors.primary500,
    borderWidth: 2,
    borderColor: colors.primary600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
})

export default ControlButton
