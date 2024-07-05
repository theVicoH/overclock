import { useState, useRef, useEffect, useContext } from "react"
import { View, StyleSheet, PanResponder, Animated, Text } from "react-native"
import { useJoystickControls } from "../hooks/joystickCalculation"
import { colors } from "common/styles"
import ControlButton from "./ControlButton"
import { SocketContext } from "../context/socket"

const Joystick = () => {
  const pan = useRef(new Animated.ValueXY()).current
  const { calculateForce } = useJoystickControls()
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [force, setForce] = useState(0)
  const [joystickDataJson, setJoystickDataJson] = useState("")
  const socket = useContext(SocketContext)

  useEffect(() => {
    const joystickData = {
      "x": parseFloat(x.toFixed(2)),
      "y": parseFloat(y.toFixed(2)),
      "force": parseFloat(force.toFixed(2))
    }
    setJoystickDataJson(JSON.stringify(joystickData))
    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket connection established.")
        socket.send(joystickDataJson)
      }
      socket.onmessage = (data) => {
        console.log("Message from server:", data)
      }
      socket.onerror = (error) => {
        console.error("WebSocket error:", error)
      }
      socket.onclose = (event) => {
        console.log("WebSocket connection closed:", event)
      }
      return () => {
        socket.close()
      }
    }
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
          <ControlButton />
        </Animated.View>
      </View>
      <Text>{joystickDataJson}</Text>
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
