
import { View, StyleSheet, Text } from "react-native"
import { colors } from "common"

export interface Props {
  size: "default" | "small"
}

const ControlButton: React.FC<Props> = ({ size }) => {
  return (
    <View style={size === "default" ? styles.joysticControllerDefault : styles.joysticControllerSmall}>
      {/* <Feather name="move" size={size === "default" ? 40 : 28} color=colors.primary600 /> */}
      <Text>Icon</Text>
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
  joysticControllerSmall: {
    height: 44,
    width: 44,
    borderRadius: 28,
    backgroundColor: colors.primary500,
    borderWidth: 2,
    borderColor: colors.primary600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default ControlButton
