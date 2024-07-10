import { createContext } from "react"
import { WebSocketContextType } from "../types/webSockets"

export const SocketContext = createContext<WebSocketContextType>(null)
