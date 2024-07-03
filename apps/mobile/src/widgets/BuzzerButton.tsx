import React from "react"
import ActionButton from "../components/ActionButton"
import { Megaphone } from "common/icons/mobile"

const BuzzerButton = () => {
  function BuzzerButtonFunction() {
    const data = [1, 5000]
    console.log(JSON.stringify(data))
  }
  return <ActionButton icon={<Megaphone />} method={BuzzerButtonFunction} />
}

export default BuzzerButton
