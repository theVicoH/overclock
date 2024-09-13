import React from "react";
import {
  CameraOff,
  CameraOn,
  Colors,
  Database,
  LogoOverclock,
  Megaphone,
} from "common/icons/mobile";
import { colors } from "common/styles";
import { View, Text, StyleSheet, Pressable } from "react-native";
import BatteryComponent from "../components/Battery";
import fontStyles from "../fontStyles";
import IconButton from "../components/IconButton";
import { ButtonShape, ButtonVariants } from "../types/buttons";
import { usePanelStore } from "../stores/usePanelStore";
import { PanelVariants } from "../types/panel";
import { useCameraStore } from "../stores/useCameraStore";
import { HeaderProps } from "../types/navigationProperties";

const Header = ({ navigation, activeVideo, setActiveVideo }: HeaderProps) => {
  const battery = 100;
  const { activePanel, setActivePanel } = usePanelStore();
  const { isCameraOn, toggleCamera } = useCameraStore();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <LogoOverclock stroke={colors.neutral0} />
        </Pressable>
        <View style={styles.batteryContainer}>
          <BatteryComponent battery={battery} />
          <Text style={[styles.batteryText, fontStyles.notoSansRegular]}>
            {battery}%
          </Text>
        </View>
      </View>
      <View style={styles.speedContainer}>
        <Text style={[styles.speedNumber, fontStyles.dsDigital]}>00</Text>
        <Text style={[styles.speedText, fontStyles.notoSansRegular]}>km/h</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <IconButton
          variant={
            activePanel === PanelVariants.BuzzerVolume
              ? ButtonVariants.Primary
              : ButtonVariants.Secondary
          }
          shape={ButtonShape.Square}
          onPress={() => setActivePanel(PanelVariants.BuzzerVolume)}
          icon={
            <Megaphone
              stroke={
                activePanel === PanelVariants.BuzzerVolume
                  ? colors.neutral900
                  : colors.neutral0
              }
            />
          }
        />
        <IconButton
          variant={
            activePanel === PanelVariants.Database
              ? ButtonVariants.Primary
              : ButtonVariants.Secondary
          }
          shape={ButtonShape.Square}
          onPress={() => setActivePanel(PanelVariants.Database)}
          icon={
            <Database
              stroke={
                activePanel === PanelVariants.Database
                  ? colors.neutral900
                  : colors.neutral0
              }
            />
          }
        />
        <IconButton
          variant={
            activeVideo === true
              ? ButtonVariants.Primary
              : ButtonVariants.Secondary
          }
          shape={ButtonShape.Square}
          onPress={() => setActiveVideo(!activeVideo)}
          icon={
            activeVideo === true ? (
              <CameraOff stroke={colors.neutral900} />
            ) : (
              <CameraOn stroke={colors.neutral0} />
            )
          }
        />
        <IconButton
          variant={
            activePanel === PanelVariants.Colors
              ? ButtonVariants.Primary
              : ButtonVariants.Secondary
          }
          shape={ButtonShape.Square}
          onPress={() => setActivePanel(PanelVariants.Colors)}
          icon={
            <Colors
              fill={
                activePanel === PanelVariants.Colors
                  ? colors.neutral900
                  : colors.neutral0
              }
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  leftContainer: {
    width: 204,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  batteryContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  batteryText: {
    fontSize: 10,
    lineHeight: 18,
    color: colors.neutral0,
    letterSpacing: -0.32,
  },
  speedContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  speedNumber: {
    fontSize: 48,
    lineHeight: 40,
    letterSpacing: -0.32,
    color: colors.neutral0,
  },
  speedText: {
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: -0.32,
    color: colors.neutral400,
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Header;
