import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Header from "../widgets/Header";
import { colors } from "common/styles";
import { AutoPageProps } from "../types/navigationProperties";
import Button from "../components/Button";
import { ButtonIconsPosition, ButtonVariants } from "../types/buttons";
import { LogoOverclock } from "common/icons/mobile";
import { SocketContext } from "../context/socket";
import { SafeAreaView } from "react-native";
import BackgroundVideoComponent from "../components/BackGroundVideo";
import Modal from "../components/Modal";

const Autopage = ({ navigation }: AutoPageProps) => {
  const [activeVideo, setActiveVideo] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const socket = useContext(SocketContext);
  useEffect(() => {
    return () => {
      if (socket) {
        // on component unmount we set car on manual mode
        socket.send(JSON.stringify({ cmd: 11, data: 0 }));
      }
    };
  }, []);
  return (
    <>
      <BackgroundVideoComponent
        active={activeVideo}
        url="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      >
        <SafeAreaView style={styles.container}>
          <Header
            navigation={navigation}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
          />
          <View style={styles.controls}>
            <Button
              variant={ButtonVariants.Primary}
              onPress={() => setActiveModal(true)}
              icon={<LogoOverclock stroke={colors.neutral1000} />}
              iconPosition={ButtonIconsPosition.Left}
            >
              Start Auto Mode
            </Button>
          </View>
        </SafeAreaView>
      </BackgroundVideoComponent>
      <Modal active={activeModal} setActive={setActiveModal} />
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
    backgroundColor: "transparent",
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
