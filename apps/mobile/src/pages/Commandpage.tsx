import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputComponent from "../components/Input";
import { Search } from "common/icons/mobile";
import BatteryComponent from "../components/Battery";

const Commandpage = () => {
  const [input, setInput] = useState<string>("");
  return (
    <SafeAreaView style={styles.commandePage}>
      <Text style={styles.title}>Commandpage</Text>
      <InputComponent
        icon={<Search />}
        placeholder="placeholder"
        setValue={setInput}
      />
      <BatteryComponent battery={40} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  commandePage: {
    backgroundColor: "#424242",
    height: "100%",
  },
  title: {
    color: "#FFFFFF",
  },
});

export default Commandpage;
