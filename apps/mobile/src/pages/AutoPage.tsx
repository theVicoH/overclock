import React, { useContext, useEffect } from "react"
import { View, StyleSheet, Alert } from "react-native"
import Header from "../widgets/Header"
import { colors } from "common/styles"
import { AutoPageProps } from "../types/navigationProperties"
import Button from "../components/Button"
import { ButtonIconsPosition, ButtonVariants } from "../types/buttons"
import { LogoOverclock } from "common/icons/mobile"
import { SocketContext } from "../context/socket"

const Autopage = ({ navigation }: AutoPageProps) => {
  const socket = useContext(SocketContext)
  useEffect(() => {
    return () => {
      if (socket) {
        // on component unmount we set car on manual mode
        socket.send(JSON.stringify({ "cmd": 11, "data": 0 }))
      }
    }
  }, [])
  return (
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
    paddingBottom: 56,
  },
});

export default Autopage;
