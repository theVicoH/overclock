import React from "react"
import { LogoOverclock, Power } from "common/icons/mobile"
import { colors } from "common/styles"
import { View, Text, StyleSheet } from "react-native"
import { ButtonVariants, ButtonIconsPosition } from "../types/buttons"
import { AutoPageConnectProps } from "../types/navigationProperties"
import ModePicker from "../widgets/ModePicker"
import Button from "../components/Button"

const AutoPageConnect: React.FC<AutoPageConnectProps> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.viewSize}>
          <LogoOverclock stroke={colors.neutral0} />
        </View>
        <ModePicker navigation={navigation} route={route} />
        <View style={styles.viewSize}>
          <Text></Text>
        </View>
      </View>
      <View>
        <Button
          variant={ButtonVariants.Primary}
          onPress={() => navigation.navigate("AutoPage") }
          icon={<Power stroke={colors.neutral1000} />}
          iconPosition={ButtonIconsPosition.Left}
        >
          Connect
        </Button>
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
    paddingBottom: 56,
    backgroundColor: colors.neutral1000,
  },
  viewSize: {
    width: 150
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 36,
    paddingVertical: 16,
    width: "100%"
  }
})

export default AutoPageConnect
