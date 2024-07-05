import React, { useState, useEffect } from "react"
import { WS_URL } from "@env"
import { WebSocketContextType } from "src/types/websockets"
import { SocketContext } from "../context/socket"
import Joystick from "../components/Joystick"

const Commandpage = () => {
  const [socket, setSocket] = useState<WebSocketContextType>(null)

  useEffect(() => {
    const newSocket = new WebSocket(`${WS_URL}`)
    setSocket(newSocket)
    return () => {
      newSocket.close()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      <Joystick />
    </SocketContext.Provider>
  )
}

export default Commandpage;
