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
    return (value * 23) / 100;
  };

  useEffect(() => {
    let size = resize(battery);
    if (battery >= 50) {
      setCurrent({ color: colors.white, size });
    }
    if (battery > 20 && battery < 50) {
      setCurrent({ color: colors.primary500, size });
    }
    if (battery <= 20) {
      setCurrent({ color: colors.red500, size });
    }
  }, [battery]);

  return (
    <View style={styles.batteryContainer}>
      <View style={styles.batteryMain}>
        <View
          style={[{ width: current.size, backgroundColor: current.color }]}
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
    borderColor: "#FFFFFF",
    borderRadius: 3,
    padding: 1,
    flexDirection: "row",
  },
  batteryUsed: {
    backgroundColor: "transparent",
    flex: 1,
  },
});

export default BatteryComponent;
