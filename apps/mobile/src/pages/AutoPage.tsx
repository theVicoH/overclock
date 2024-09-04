import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, SafeAreaView } from "react-native";
import { WS_URL } from "@env";
import { WebSocketContextType } from "../types/webSockets";
import { SocketContext } from "../context/socket";
import Header from "../widgets/Header";
import { colors } from "common/styles";
import { AutoPageProps } from "../types/navigationProperties";
import Button from "../components/Button";
import { ButtonIconsPosition, ButtonVariants } from "../types/buttons";
import { LogoOverclock } from "common/icons/mobile";
import Modal from "../components/Modal";

const Autopage = ({ navigation }: AutoPageProps) => {
  const [socket, setSocket] = useState<WebSocketContextType>(null);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const newSocket = new WebSocket(`${WS_URL}`);
    setSocket(newSocket);
  }, []);

  if (socket) {
    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };
    socket.onmessage = (data: MessageEvent<Object>) => {
      console.log("Message from server:", data);
    };
    socket.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };
    socket.onclose = (event: CloseEvent) => {
      console.log("WebSocket connection closed:", event);
    };
  }

  return (
    <>
      <SocketContext.Provider value={socket}>
        <SafeAreaView style={styles.container}>
          <Header navigation={navigation} />
          <View style={styles.controls}>
            <Button
              variant={ButtonVariants.Primary}
              onPress={() => setActive(true)}
              icon={<LogoOverclock stroke={colors.neutral1000} />}
              iconPosition={ButtonIconsPosition.Left}
            >
              Start Auto Mode
            </Button>
          </View>
        </SafeAreaView>
      </SocketContext.Provider>
      <Modal active={active} setActive={setActive} />
    </>
  );
};

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
