import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Alert, Dimensions } from "react-native";
import Header from "../widgets/Header";
import { colors } from "common/styles";
import { AutoPageProps } from "../types/navigationProperties";
import Button from "../components/Button";
import { ButtonIconsPosition, ButtonVariants } from "../types/buttons";
import { LogoOverclock } from "common/icons/mobile";
import { SocketContext } from "../context/socket";
import { SafeAreaView } from "react-native";
import Panel from "../widgets/Panel";
import { VIDEO_URL } from "@env";
import { WebView } from "react-native-webview"
import { useCameraStore } from "../stores/useCameraStore";

const Autopage = ({ navigation }: AutoPageProps) => {
  const { isCameraOn } = useCameraStore()
  const { width, height } = Dimensions.get("window");
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
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: VIDEO_URL }}
        style={{
          width: width,
          height: height,
          display: isCameraOn === false ? "none" : "flex"
        }}
      />
      <Header navigation={navigation} />
      <Panel />
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
    </SafeAreaView>
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 56,
  },
});

export default Autopage;
