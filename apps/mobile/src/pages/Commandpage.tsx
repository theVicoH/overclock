import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Commandpage = () => {
  return (
    <SafeAreaView style={styles.commandePage}>
      <Text style={styles.title}>Commandpage</Text>
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
