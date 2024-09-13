import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { usePanelStore } from "../stores/usePanelStore";
import { PanelVariants } from "../types/panel";
import { colors } from "common/styles";
import fontStyles from "../fontStyles";
import DeviceInfo from "react-native-device-info";
import Slider from "../components/Slider";
import Button from "../components/Button";
import { WEBSITE_URL } from "@env"
import { SocketContext } from "../context/socket";

const LED = [
  {
    color: "Red",
    rgb: [255, 0, 0]
  },
  {
    color: "Green",
    rgb: [0, 255, 0]
  },
  {
    color: "Red",
    rgb: [0, 0, 255]
  },
  {
    color: "White",
    rgb: [255, 255, 255]
  }
]

const Panel = () => {
  const { activePanel } = usePanelStore();
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const fetchDeviceName = async () => {
      const name = await DeviceInfo.getDeviceName();
      setDeviceName(name);
    };

    fetchDeviceName();
  }, []);

  const handleMoreInfoPress = () => {
    Linking.openURL(WEBSITE_URL);
  };

  const handleColorClick = (rgb: number[]) => {
    const payload = {
      cmd: 6,
      data: [0, ...rgb],
    };

    if (socket) {
      socket.send(JSON.stringify(payload));
    }
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case PanelVariants.BuzzerVolume:
        return (
          <View style={styles.panelContent}>
            <View style={styles.buzzerVolumeContent}>
              <View style={styles.background} />
              <Text style={[styles.caption, fontStyles.notoSansRegular]}>Buzzer Volume</Text>
              <Slider />
            </View>
          </View>
        );
      case PanelVariants.Database:
        return (
          <View style={styles.panelContent}>
            <View style={styles.databasePanelContent}>
              <View style={styles.background} />
              <View style={styles.databaseTitleLine}>
                <Text style={[styles.databasePanelTitle, fontStyles.notoSansSemiBold]}>Overclock</Text>
                <Text style={[styles.caption, fontStyles.notoSansRegular]}>Name</Text>
              </View>
              <View style={styles.specContent}>
                <View style={styles.databaseTitleLine}>
                  <Text style={[styles.carSpec, fontStyles.notoSansMedium]}>10 km/h</Text>
                  <Text style={[styles.caption, fontStyles.notoSansRegular]}>Max-speed</Text>
                </View>
                <View style={styles.databaseTitleLine}>
                  <Text style={[styles.carSpec, fontStyles.notoSansMedium]}>10 h</Text>
                  <Text style={[styles.caption, fontStyles.notoSansRegular]}>Battery-life</Text>
                </View>
                <View style={styles.databaseTitleLine}>
                  <Text style={[styles.carSpec, fontStyles.notoSansMedium, styles.deviceName]}>
                    {deviceName || "..."}
                  </Text>
                  <Text style={[styles.caption, fontStyles.notoSansRegular]}>Device</Text>
                </View>
              </View>
            </View>
            <Button fullWidth={true} onPress={handleMoreInfoPress}>More Informations</Button>

          </View>
        );
      case PanelVariants.Colors:
        return (
          <View style={styles.panelContent}>
            <View style={styles.colorContainer}>
              <View style={styles.background} />
              {LED.map((led, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.colorItem}
                  onPress={() => handleColorClick(led.rgb)}
                >
                  <Text style={[styles.caption, fontStyles.notoSansRegular]}>{led.color}</Text>
                  <View
                    style={[
                      styles.colorBox,
                      { backgroundColor: `rgb(${led.rgb.join(",")})` },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const panelContent = renderPanelContent();

  if (!panelContent) return null;

  return (
    <View style={styles.panelContainer}>
      {panelContent}
    </View>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    position: "absolute",
    top: 70,
    right: 24,
    width: 180,
    zIndex: 20,
  },
  panelContent: {
    position: "relative",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.neutral600,
    opacity: 0.2,
    borderWidth: 1,
    borderColor: colors.neutral600,
    borderStyle: "solid",
    borderRadius: 8,
  },
  panelText: {
    fontSize: 16,
    color: "white",
  },
  descriptionText: {
    fontSize: 14,
    color: "lightgray",
    marginTop: 8,
  },
  buzzerVolumeContent: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 12,
    borderRadius: 6,
  },
  databasePanelContent: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 12,
    borderRadius: 6,
  },
  databaseTitleLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  databasePanelTitle: {
    fontSize: 14,
    color: colors.neutral0,
  },
  specContent: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  caption: {
    fontSize: 10,
    color: colors.neutral200,
  },
  carSpec: {
    fontSize: 12,
    color: colors.neutral600,
  },
  deviceName: {
    maxWidth: 140,
    flexWrap: "wrap",
  },
  colorContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: 12,
    borderRadius: 6,
  },
  colorItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    color: colors.neutral0,
  },
  colorBox: {
    width: 60,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.neutral600,
  },
});

export default Panel;
