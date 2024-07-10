import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors } from "common/styles"
import { ChevronLeft, ChevronRight } from "common/icons/mobile"
import { ButtonShape, ButtonVariants } from "../types/buttons"
import IconButton from "../components/IconButton"
import fontStyles from "../fontStyles"

export default function ModePicker({ navigation, route }: any) {
  const handleNavigation = () => {
    if (route.name === "ManualPage") {
      navigation.navigate("AutoPage")
    } else {
      navigation.navigate("ManualPage")
    }
  }
  return (
    <View style={styles.container}>
      <IconButton
        variant={ButtonVariants.Inline}
        shape={ButtonShape.Square}
        onPress={handleNavigation}
        icon={<ChevronLeft stroke={colors.neutral0} />}
      />
      <View style={styles.subContainer}>
        <Text style={[styles.title, fontStyles.notoSansRegular]}>Mode</Text>
        { route.name === "ManualPage" ? (
          <Text style={[styles.subTitle, fontStyles.notoSansRegular]}>Manual</Text>
        ) : (
          <Text style={[styles.subTitle, fontStyles.notoSansRegular]}>Auto</Text>
        )}
      </View>
      <IconButton
        variant={ButtonVariants.Inline}
        shape={ButtonShape.Square}
        onPress={handleNavigation}
        icon={<ChevronRight stroke={colors.neutral0} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 64,
  },
  title: {
    color: colors.neutral400,
    fontSize: 10,
    lineHeight: 18,
  },
  subTitle: {
    color: colors.neutral0,
    fontSize: 14,
    lineHeight: 21,
  },
})
