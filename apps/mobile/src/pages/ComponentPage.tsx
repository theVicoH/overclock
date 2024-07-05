import { Search } from "common/icons/mobile";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import InputComponent from "../components/Input";
import BatteryComponent from "../components/Battery";
import SpeedComponent from "../components/Speed";
import { colors } from "common/styles";

const ComponentPage = () => {
  const [value, setValue] = useState<string>("");
  return (
    <SafeAreaView style={styles.page}>
      <InputComponent placeholder="placeholder" setValue={setValue} />
      <InputComponent
        placeholder="placeholder"
        setValue={setValue}
        icon={<Search stroke={colors.neutral0} />}
      />
      <BatteryComponent battery={45} />
      <SpeedComponent value={24} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.neutral800,
    height: "100%",
  },
  title: {
    color: colors.neutral0,
  },
});

export default ComponentPage;
