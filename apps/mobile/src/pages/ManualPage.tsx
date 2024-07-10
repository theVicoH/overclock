import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { colors } from "common/styles"
import ModePicker from "../widgets/ModePicker"
import { ManualPageNavigationProperties } from "../types/navigationProperties"
import Button from "../components/Button"
import { ButtonIconsPosition, ButtonVariants } from "../types/buttons"
import { Power } from "common/icons/mobile"

const ManualPage: React.FC<ManualPageNavigationProperties> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View>
        <ModePicker navigation={navigation} route={route} />
      </View>
      <Button
        variant={ButtonVariants.Primary}
        onPress={() => navigation.navigate("CommandPage")}
        icon={<Power stroke={colors.neutral1000} />}
        iconPosition={ButtonIconsPosition.Left}
      >
        Connect
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral1000,
    paddingTop: 20,
    alignItems: "center"
  },
  text: {
    color: colors.neutral100
  }
})

export default ManualPage
