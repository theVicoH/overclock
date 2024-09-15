import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "common/styles";
import { useEffect, useState } from "react";

interface BatteryComponentProps {
  battery: number;
}

interface CurrentType {
  color: string;
  size: number;
}

const BatteryComponent = ({ battery }: BatteryComponentProps) => {
  const [current, setCurrent] = useState<CurrentType>({
    color: colors.white,
    size: battery,
  });

  const resize = (value: number) => {
    const maxBatteryWidth = 23;
    return (value * maxBatteryWidth) / 100;
  };

  useEffect(() => {
    let size = Math.round(Math.floor(resize(battery)));
    if (size > 21) {
      size = 21;
    }
    if (battery >= 50) {
      setCurrent({ color: colors.white, size });
    } else if (battery > 20 && battery < 50) {
      setCurrent({ color: colors.primary500, size });
    } else if (battery <= 20) {
      setCurrent({ color: colors.red500, size });
    }
  }, [battery]);

  return (
    <View style={styles.batteryContainer}>
      <View style={styles.batteryMain}>
        <View
          testID="batteryFill"
          style={[
            styles.batteryFill,
            { width: current.size, backgroundColor: current.color },
          ]}
        ></View>
        <View style={styles.batteryUsed}></View>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  batteryContainer: {
    height: 13,
    width: 28,
  },
  batteryMain: {
    width: 25,
    height: 13,
    borderWidth: 1.06,
    borderColor: colors.neutral0,
    borderRadius: 3,
    padding: 1,
    flexDirection: "row",
  },
  batteryFill: {
    height: "100%",
  },
  batteryUsed: {
    backgroundColor: "transparent",
    flex: 1,
    maxWidth: 21,
  },
});

export default BatteryComponent;
