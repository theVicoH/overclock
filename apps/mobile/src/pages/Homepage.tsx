import React from "react";
import { Button, Text, View } from "react-native";

const Homepage = ({ navigation }: any) => {
  return (
    <View>
      <Text>Homepage</Text>
      <Button title="Command" onPress={() => navigation.navigate("Command")} />
      <Button title="Data" onPress={() => navigation.navigate("Data")} />
      <Button title="Button" onPress={() => navigation.navigate("Button")} />
      <Button
        title="Components"
        onPress={() => navigation.navigate("Components")}
      />
    </View>
  );
};

export default Homepage;
