import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "common/styles";
import { ChevronLeft, ChevronRight } from "common/icons/mobile";
import { ButtonShape, ButtonVariants } from "../types/buttons";
import IconButton from "../components/IconButton";
import fontStyles from "../fontStyles";
import useModeStore from "../stores/useModeStore";

export default function ModePicker() {
  const { mode, toggleMode } = useModeStore();

  return (
    <View style={styles.container}>
      <IconButton
        variant={ButtonVariants.Inline}
        shape={ButtonShape.Square}
        onPress={toggleMode}
        icon={<ChevronLeft stroke={colors.neutral0} />}
      />
      <View style={styles.subContainer}>
        <Text style={[styles.title, fontStyles.notoSansRegular]}>Mode</Text>
        <Text style={[styles.subTitle, fontStyles.notoSansRegular]}>
          {mode}
        </Text>
      </View>
      <IconButton
        variant={ButtonVariants.Inline}
        shape={ButtonShape.Square}
        onPress={toggleMode} // Change le mode à droite
        icon={<ChevronRight stroke={colors.neutral0} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 64,
  },
  title: {
    color: colors.neutral400,
    fontSize: 10,
    lineHeight: 18,
  },
  subTitle: {
    color: colors.neutral0,
    fontSize: 14,
    lineHeight: 21,
  },
});
