import { useState, useRef, useEffect } from "react"
import { View, StyleSheet, PanResponder, Animated, Text } from "react-native"
import { useJoystickControls } from "../hooks/joystickCalculation"
import { colors } from "common"
import ControlButton from "./ControlButton"

const Joystick = () => {
  const pan = useRef(new Animated.ValueXY()).current
  const { calculateForce } = useJoystickControls()
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [force, setForce] = useState(0)
  const [json, setJson] = useState("")

  useEffect(() => {
    const data = {
      "x": x.toFixed(2),
      "y": y.toFixed(2),
      "force": force.toFixed(2)
    }
    setJson(JSON.stringify(data))
  }, [x, y, force])

  useEffect(() => {
    const xListener = pan.x.addListener(value => setX(value.value))
    const yListener = pan.y.addListener(value => setY(value.value))
    return () => {
      pan.x.removeListener(xListener)
      pan.y.removeListener(yListener)
    }
  }, [pan])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const { dx, dy } = gestureState
        const radius = 64
        const distance = Math.sqrt(dx * dx + dy * dy)
        setForce(calculateForce(distance, radius))

        if (distance < radius) {
          pan.setValue({ x: dx, y: dy })
        } else {
          const angle = Math.atan2(dy, dx)
          const clampedX = radius * Math.cos(angle)
          const clampedY = radius * Math.sin(angle)
          pan.setValue({ x: clampedX, y: clampedY })
        }
      },
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 }, useNativeDriver: false
        }).start()
        setForce(0)
      }
    }),
  ).current

  return (
    <View style={styles.container}>
      <View style={styles.joystickBackground}>
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }]
          }}
          {...panResponder.panHandlers}>
          <ControlButton size={"default"} />
        </Animated.View>
      </View>
      <Text>{json}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  joystickBackground: {
    height: 124,
    width: 124,
    borderRadius: 64,
    backgroundColor: colors.neutral0,
    borderWidth: 2,
    borderColor: colors.neutral300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default Joystick
