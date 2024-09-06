import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { WS_URL } from "@env"
import { WebSocketContextType } from "../types/webSockets"
import { SocketContext } from "../context/socket"
import Joystick from "../components/Joystick"
import BuzzerButton from "../widgets/BuzzerButton"
import Header from "../widgets/Header"
import { colors } from "common/styles"
import { CommandPageProps } from "../types/navigationProperties"

const Commandpage = ({ navigation }: CommandPageProps) => {
  const [socket, setSocket] = useState<WebSocketContextType>(null)

  useEffect(() => {
    const newSocket = new WebSocket(`${WS_URL}`)
    setSocket(newSocket)
  }, [])

  if (socket) {
    socket.onopen = () => {
      console.log("WebSocket connection established.")
    }
    socket.onmessage = (data: MessageEvent<any>) => {
      console.log("Message from server:", data)
    }
    socket.onerror = (error: Event) => {
      console.error("WebSocket error:", error)
    }
    socket.onclose = (event: CloseEvent) => {
      console.log("WebSocket connection closed:", event)
    }
  }

  return (
    <SocketContext.Provider value={socket}>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.controls}>
          <Joystick />
          <BuzzerButton />
        </View>
      </View>
    </SocketContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.neutral1000,
  },
  controls: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 80,
    paddingBottom: 48
  }
})

export default Commandpage;
