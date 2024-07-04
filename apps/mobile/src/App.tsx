import React, { useEffect } from "react"
import type { PropsWithChildren } from "react"
import { StyleSheet, Text, useColorScheme, View } from "react-native"

import { Colors } from "react-native/Libraries/NewAppScreen"
import Orientation from "react-native-orientation-locker"
import fontStyles from "./fontStyles"
import { enableScreens } from "react-native-screens"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import Homepage from "./pages/Homepage"
import Commandpage from "./pages/Commandpage"
import Datapage from "./pages/Datapage"
import { Slider } from "./components/Slider"
import { Close, LogoOverclock } from "common/icons/mobile"

type SectionProps = PropsWithChildren<{
  title: string
}>

enableScreens()

const Stack = createNativeStackNavigator()

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark"
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Close />
      <LogoOverclock />
      <Slider />
      <Text style={[fontStyles.notoSansBold]}>This is NotoSans Bold text.</Text>
      <Text style={[fontStyles.dsDigital]}>This is DS-Digital text.</Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  )
}

function App(): React.JSX.Element {
  useEffect(() => {
    Orientation.lockToLandscape()

    return () => {
      Orientation.unlockAllOrientations()
    }
  }, [])
  const isDarkMode = useColorScheme() === "dark"

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }
  useEffect(() => {
    Orientation.lockToLandscape()

    return () => {
      Orientation.unlockAllOrientations()
    }
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Command" component={Commandpage} />
        <Stack.Screen name="Data" component={Datapage} />
      </Stack.Navigator>
      {/* <Section title=""></Section> */}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  colorRed: {
    color: "red",
  },
})

export default App
