import React, { Dispatch, useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "common/styles";

interface InputComponentProps {
  placeholder: string;
  icon?: React.ReactElement;
  value?: string | number;
  setValue: Dispatch<React.SetStateAction<string>>;
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  icon,
  setValue,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const handleChange = (text: string) => {
    setValue(text);
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      activeOpacity={1}
      onPress={handleFocus}
    >
      <View style={[styles.inputContainer, isFocused && styles.inputActive]}>
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral400}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => handleChange(text)}
          style={styles.input}
        />
        {icon && <View style={styles.icon}>{icon}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    maxHeight: 38,
    borderWidth: 1,
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
    minHeight: 38,
  },
  inputActive: {
    borderColor: colors.neutral0,
  },
  icon: {
    width: 16,
    height: 16,
  },
  touchableOpacity: {
    minHeight: 48,
    justifyContent: "center",
  },
});

export default InputComponent;
