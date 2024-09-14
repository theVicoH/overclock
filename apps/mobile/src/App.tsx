import React, { useState, useEffect } from "react";
import Orientation from "react-native-orientation-locker";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./types/rootStackParamList";
import ManualPage from "./pages/ManualPage";
import Autopage from "./pages/AutoPage";
import ModeSelectionPage from "./pages/ModeSelectionPage";
import { WS_URL } from "@env"
import { WebSocketContextType } from "./types/webSockets"
import { SocketContext } from "./context/socket"
import "react-native-svg"

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [socket, setSocket] = useState<WebSocketContextType>(null)

  useEffect(() => {
    Orientation.lockToLandscape();

    const newSocket = new WebSocket(`${WS_URL}`);

    newSocket.onopen = () => {
      console.log("WebSocket connection established.");
    };
    newSocket.onmessage = (event: MessageEvent) => {
      console.log("Message from server:", event.data);
    };
    newSocket.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };
    newSocket.onclose = (event: CloseEvent) => {
      console.log("WebSocket connection closed:", event);
    };
    setSocket(newSocket);

    return () => {
      Orientation.unlockAllOrientations();
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ModeSelectionPage"
          screenOptions={{
            headerShown: false,
            animation: "none",
          }}
        >
          <Stack.Screen name="ModeSelectionPage" component={ModeSelectionPage} />
          <Stack.Screen name="ManualPage" component={ManualPage} />
          <Stack.Screen name="AutoPage" component={Autopage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SocketContext.Provider>
  );
}

export default App;
