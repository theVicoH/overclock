import React from "react"
import { CameraOff, Database, LogoOverclock, Settings, Smile } from "common/icons/mobile"
import { colors } from "common/styles"
import { View, Text, StyleSheet, Alert, Pressable } from "react-native"
import BatteryComponent from "../components/Battery"
import fontStyles from "../fontStyles"
import IconButton from "../components/IconButton"
import { ButtonShape, ButtonVariants } from "../types/buttons"

const Header = ({ navigation }: any) => {
  const battery = 100
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Pressable onPress={() => navigation.goBack() }>
          {/* TODO mettre le bon logo */}
          <LogoOverclock stroke={colors.neutral0} />
        </Pressable>
        <View style={styles.batteryContainer}>
          <BatteryComponent battery={battery} />
          <Text style={[styles.batteryText, fontStyles.notoSansRegular]}>{battery}%</Text>
        </View>
      </View>
      <View style={styles.speedContainer}>
        <Text style={[styles.speedNumber, fontStyles.dsDigital]}>00</Text>
        <Text style={[styles.speedText, fontStyles.notoSansRegular]}>km/h</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <IconButton
          variant={ButtonVariants.Secondary}
          shape={ButtonShape.Square}
          onPress={() => Alert.alert("Icon Button Secondary Square")}
          icon={<Smile stroke={colors.neutral0} />}
        />
        <IconButton
          variant={ButtonVariants.Secondary}
          shape={ButtonShape.Square}
          onPress={() => Alert.alert("Icon Button Secondary Square")}
          icon={<Database stroke={colors.neutral0} />}
        />
        <IconButton
          variant={ButtonVariants.Primary}
          shape={ButtonShape.Square}
          onPress={() => Alert.alert("Icon Button Primary Square")}
          icon={<CameraOff stroke={colors.neutral1000} />}
        />
        <IconButton
          variant={ButtonVariants.Primary}
          shape={ButtonShape.Square}
          onPress={() => Alert.alert("Icon Button Primary Square")}
          icon={<Settings stroke={colors.neutral1000} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  leftContainer: {
    width: 204,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 24
  },
  batteryContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center"
  },
  batteryText: {
    fontSize: 10,
    lineHeight: 18,
    color: colors.neutral0,
    letterSpacing: -0.32,
  },
  speedContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 4
  },
  speedNumber: {
    fontSize: 48,
    lineHeight: 40,
    letterSpacing: -0.32,
    color: colors.neutral0
  },
  speedText: {
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: -0.32,
    color: colors.neutral400
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  }
})

export default Header
