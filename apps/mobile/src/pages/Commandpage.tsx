import React, { createContext, useState, useEffect } from "react"
import { WS_URL } from "@env"
import { WebSocketContextType } from "src/types/websockets"
import Joystick from "../components/Joystick"

export const SocketContext = createContext<WebSocketContextType>(null)

const Commandpage = () => {
  const [socket, setSocket] = useState<WebSocketContextType>(null)

  useEffect(() => {
    const newSocket = new WebSocket(`${WS_URL}`)
    setSocket(newSocket)
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      <Joystick />
    </SocketContext.Provider>
  )
}

export default Commandpage
