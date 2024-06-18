import React from "react";
import { Button, Text, View } from "react-native";

const Homepage = ({ navigation }: any) => {
  return (
    <View>
      <Text>Homepage</Text>
      <Button title="Command" onPress={() => navigation.navigate("Command")} />
      <Button title="Data" onPress={() => navigation.navigate("Data")} />
    </View>
  );
};

export default Homepage;
