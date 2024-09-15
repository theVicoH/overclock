import React from "react";
import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Joystick from "../components/Joystick";
import BuzzerButton from "../widgets/BuzzerButton";
import Header from "../widgets/Header";
import { ManualPageProps } from "../types/navigationProperties";
import Panel from "../widgets/Panel";
import { VIDEO_URL } from "@env";
import { WebView } from "react-native-webview"
import { colors } from "common/styles";
import { useCameraStore } from "../stores/useCameraStore";

const ManualPage = ({ navigation }: ManualPageProps) => {
  const { width, height } = Dimensions.get("window");
  const { isCameraOn } = useCameraStore();
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
        <Joystick />
        <BuzzerButton />
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
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 80,
    paddingBottom: 48,
  },
});

export default ManualPage;
