import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Slider as BaseSlider } from "@miblanchard/react-native-slider"
import { colors } from "common/styles"

export function Slider() {
  const [volume, setVolume] = useState(5000)
  const handleValueChange = (value: number[]) => {
    const newValue = Number(value)
    setVolume(newValue)
  }
  return (
    <View style={styles.container} testID="slider">
      {/* <Text>{Math.floor(volume)}</Text> */}
      <BaseSlider
        onValueChange={handleValueChange}
        value={volume}
        containerStyle={styles.containerStyle}
        maximumTrackTintColor={colors.primary900}
        minimumTrackTintColor={colors.primary600}
        thumbTintColor={colors.primary500}
        thumbTouchSize={{ width: 48, height: 48 }}
        minimumValue={0}
        maximumValue={10000}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  containerStyle: {
    width: "100%",
    height: 4,
  },
})
