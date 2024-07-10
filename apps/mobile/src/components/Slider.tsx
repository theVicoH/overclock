import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Slider as BaseSlider } from "@miblanchard/react-native-slider"
import { colors } from "common/styles"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function Slider() {
  const [volume, setVolume] = useState(5000)
  const handleValueChange = async (value: number[]) => {
    const newValue = Number(value)
    setVolume(newValue)
    await AsyncStorage.setItem("volume", JSON.stringify(Math.floor(volume)))
  }
  return (
    <View style={styles.container} >
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
