import React, { Dispatch, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

interface InputComponentProps {
  placeholder: string;
  children?: React.ReactNode;
  value?: string | number;
  setValue: Dispatch<React.SetStateAction<any>>;
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  children,
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
        placeholderTextColor="#BDBDBD"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={(text) => handleChange(text)}
        style={styles.input}
      />
      {children && <View style={styles.children}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    maxHeight: 37,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#202020",
    opacity: 0.4,
    borderColor: "#757575",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    color: "#F6F5F5",
    flex: 1,
  },
  inputActive: {
    borderColor: "#F6F5F5",
  },
  children: {
    width: 16,
    height: 16,
  },
});

export default InputComponent;
