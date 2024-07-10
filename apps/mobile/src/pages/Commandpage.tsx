import React, { useState, useEffect } from "react"
import { WS_URL } from "@env"
import { WebSocketContextType } from "../types/webSockets"
import { SocketContext } from "../context/socket"
import Joystick from "../components/Joystick"
import BuzzerButton from "../widgets/BuzzerButton"
import { Slider } from "../components/Slider"

const Commandpage = () => {
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
      <BuzzerButton />
      <Slider />
      <Joystick />
    </SocketContext.Provider>
  )
}

export default Commandpage;
