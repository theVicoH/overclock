import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import Joystick from "../components/Joystick";
import BuzzerButton from "../widgets/BuzzerButton";
import Header from "../widgets/Header";
import { colors } from "common/styles";
import { ManualPageProps } from "../types/navigationProperties";
import BackgroundVideoComponent from "../components/BackGroundVideo";

const ManualPage = ({ navigation }: ManualPageProps) => {
  const [activeVideo, setActiveVideo] = useState<boolean>(false);
  return (
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
          <Joystick />
          <BuzzerButton />
        </View>
      </SafeAreaView>
    </BackgroundVideoComponent>
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
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 80,
    paddingBottom: 48,
  },
});

export default ManualPage;
