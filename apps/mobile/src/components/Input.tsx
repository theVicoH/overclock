import React, { Dispatch, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "common/styles";

interface InputComponentProps {
  placeholder: string;
  icon?: React.ReactElement;
  value?: string | number;
  setValue: Dispatch<React.SetStateAction<any>>;
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  icon,
  setValue,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (text: string) => {
    setValue(text);
  };

  return (
    <View style={[styles.inputContainer, isFocused && styles.inputActive]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.neutral400}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={(text) => handleChange(text)}
        style={styles.input}
      />
      {icon && <View style={styles.icon}>{icon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    maxHeight: 37,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.neutral900,
    opacity: 0.32,
    borderColor: colors.neutral600,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    color: colors.neutral0,
    flex: 1,
  },
  inputActive: {
    borderColor: colors.neutral0,
  },
  icon: {
    width: 16,
    height: 16,
  },
});

export default InputComponent;
