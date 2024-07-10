import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors } from "common/styles"
import { ChevronLeft, ChevronRight } from "common/icons/mobile"
import { ButtonShape, ButtonVariants } from "../types/buttons"
import IconButton from "../components/IconButton"
import fontStyles from "../fontStyles"

export default function ModePicker() {
  const modes = ["Manual", "Auto", "Cat"]
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState(modes[0])
  function handleNextMode() {
    let newIndex = index + 1
    if (newIndex >= modes.length) {
      newIndex = 0
    }
    setIndex(newIndex)
    setMode(modes[newIndex])
  }
  function handlePreviousMode() {
    let newIndex = index - 1
    if (newIndex < 0) {
      newIndex = modes.length - 1
    }
    setIndex(newIndex)
    setMode(modes[newIndex])
  }
  return (
    <View style={styles.container}>
      <IconButton
        variant={ButtonVariants.Inline}
        shape={ButtonShape.Square}
        onPress={() => handlePreviousMode()}
        icon={<ChevronLeft stroke={colors.neutral0} />}
      />
      <View style={styles.subContainer}>
        <Text style={[styles.title, fontStyles.notoSansRegular]}>Mode</Text>
        <Text style={[styles.subTitle, fontStyles.notoSansRegular]}>{String(mode)}</Text>
      </View>
      <IconButton
        variant={ButtonVariants.Inline}
        shape={ButtonShape.Square}
        onPress={() => handleNextMode()}
        icon={<ChevronRight stroke={colors.neutral0} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 64
  },
  title: {
    color: colors.neutral400,
    fontSize: 10,
    lineHeight: 18
  },
  subTitle : {
    color: colors.neutral0,
    fontSize: 14,
    lineHeight: 21
  }
})
