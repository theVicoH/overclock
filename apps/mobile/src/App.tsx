import React, { useEffect } from "react"
import type { PropsWithChildren } from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native"

import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen"
import Orientation from "react-native-orientation-locker"
import fontStyles from "./fontStyles"

type SectionProps = PropsWithChildren<{
  title: string
}>

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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Section title="Step One">
            Edit <Text style={[styles.highlight, styles.colorRed]}>App.tsx</Text> to change this screen and then come back eizqjdiqo odazp
            to see vitomir tg your edits dzqlkndzqiodopjzqmdzq.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">Read the docs to discover what to do next:</Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
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
