import React from "react"
import { Pressable, View, StyleSheet } from "react-native"
import { colors } from "common/styles"

interface Props {
  icon: React.ReactElement
  method: () => void
}

const ActionButton: React.FC<Props> = ({ icon, method }) => {
  return (
    <Pressable style={styles.buttonContainer} onPress={method}>
      <View style={styles.buttonContent}>
        { icon }
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContent: {
    height: 36,
    width: 36,
    borderRadius: 28,
    backgroundColor: colors.primary500,
    borderWidth: 2,
    borderColor: colors.primary600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default ActionButton
