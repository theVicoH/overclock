import { colors } from "common/styles";
import React from "react";
import { StyleSheet, Text } from "react-native";
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
    backgroundColor: colors.neutral800,
    height: "100%",
  },
  title: {
    color: colors.neutral0,
  },
});

export default Commandpage;
