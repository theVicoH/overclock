import { StyleSheet, Text, View } from "react-native";
import fontStyles from "../fontStyles";
import { colors } from "common/styles";

interface SpeedComponentProps {
  value: number;
}

const SpeedComponent = ({ value }: SpeedComponentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.typoValue, fontStyles.dsDigital]}>{value}</Text>
      </View>
      <Text style={[styles.typoUnit, fontStyles.notoSansMedium]}>km/h</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  typoValue: {
    fontSize: 48,
    color: colors.neutral0,
    paddingHorizontal: 4,
  },
  typoUnit: {
    width: 24,
    height: 18,
    color: colors.neutral400,
    fontSize: 10,
  },
});

export default SpeedComponent;
