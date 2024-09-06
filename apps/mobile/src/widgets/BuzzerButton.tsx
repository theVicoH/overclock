import React, { useContext } from "react"
import ActionButton from "../components/ActionButton"
import { Megaphone } from "common/icons/mobile"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SocketContext } from "../context/socket"
import { colors } from "common/styles"

interface BuzzerPayload {
  cmd: number
  data?: number[]
}

const BuzzerButton = () => {
  const socket = useContext(SocketContext)
  async function HandleBuzzer() {
    const asyncStorageVolume = await AsyncStorage.getItem("volume")
    let payload: BuzzerPayload = { "cmd": 8 }
    if (!asyncStorageVolume || !socket) return;
    const intVolume = JSON.parse(asyncStorageVolume)
    setTimeout(() => {
      payload["data"] = [0, intVolume]
      socket.send(JSON.stringify(payload))
    }, 300)
    payload["data"] = [1, intVolume]
    socket.send(JSON.stringify(payload))
  }
  return <ActionButton icon={<Megaphone stroke={colors.primary600} />} method={HandleBuzzer} />
}

export default BuzzerButton
