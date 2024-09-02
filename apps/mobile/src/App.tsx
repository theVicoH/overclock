import React, { useEffect } from "react";
import Orientation from "react-native-orientation-locker";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./types/rootStackParamList";
import ManualPage from "./pages/ManualPage";
import Commandpage from "./pages/Commandpage";
import AutoPageConnect from "./pages/AutoPageConnect";
import Autopage from "./pages/AutoPage";

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  useEffect(() => {
    Orientation.lockToLandscape();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  useEffect(() => {
    Orientation.lockToLandscape();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ManualPage"
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="ManualPage" component={ManualPage} />
        <Stack.Screen name="AutoPageConnect" component={AutoPageConnect} />
        <Stack.Screen name="CommandPage" component={Commandpage} />
        <Stack.Screen name="AutoPage" component={Autopage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
