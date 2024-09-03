import React, { useState, useEffect } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { WS_URL } from "@env"
import { WebSocketContextType } from "../types/webSockets"
import { SocketContext } from "../context/socket"
import Header from "../widgets/Header"
import { colors } from "common/styles"
import { AutoPageProps } from "../types/navigationProperties"
import Button from "../components/Button"
import { ButtonIconsPosition, ButtonVariants } from "../types/buttons"
import { LogoOverclock } from "common/icons/mobile"

const Autopage = ({ navigation }: AutoPageProps) => {
  const [socket, setSocket] = useState<WebSocketContextType>(null)

  useEffect(() => {
    const newSocket = new WebSocket(`${WS_URL}`)
    setSocket(newSocket)
  }, [])

  if (socket) {
    socket.onopen = () => {
      console.log("WebSocket connection established.")
    }
    // TODO se connecter à la voiture et log le typeof(data) pour savoir quoi mettre à la place de any
    socket.onmessage = (data: MessageEvent<any>) => {
      console.log("Message from server:", typeof(data))
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
          <Button
            variant={ButtonVariants.Primary}
            onPress={() => Alert.alert("Starting Auto Mode")}
            icon={<LogoOverclock stroke={colors.neutral1000} />}
            iconPosition={ButtonIconsPosition.Left}
          >
            Start Auto Mode
          </Button>
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 56
  }
})

export default Autopage;
