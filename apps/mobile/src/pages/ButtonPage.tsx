import React from "react"
import { Alert, StyleSheet, Text, View, ScrollView } from "react-native"
import Button from "../components/Button"
import IconButton from "../components/IconButton"
import { Close } from "common/icons/mobile"
import { colors } from "common/styles"
import { ButtonIconsPosition, ButtonShape, ButtonVariants } from "../types/buttons"

const ButtonPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button variant={ButtonVariants.Primary} onPress={() => Alert.alert("Primary Button")}>
        Primary Button
      </Button>
      <Button
        variant={ButtonVariants.Primary}
        onPress={() => Alert.alert("Primary Button with Icon Left")}
        icon={<Close stroke={colors.neutral1000} />}
        iconPosition={ButtonIconsPosition.Left}
      >
        Primary Button
      </Button>
      <Button
        variant={ButtonVariants.Primary}
        onPress={() => Alert.alert("Primary Button with Icon Right")}
        icon={<Close stroke={colors.neutral1000} />}
        iconPosition={ButtonIconsPosition.Right}
      >
        Primary Button
      </Button>

      <Button variant={ButtonVariants.Secondary} onPress={() => Alert.alert("Secondary Button")}>
        Secondary Button
      </Button>
      <Button
        variant={ButtonVariants.Secondary}
        onPress={() => Alert.alert("Secondary Button with Icon Left")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Left}
      >
        Secondary Button
      </Button>
      <Button
        variant={ButtonVariants.Secondary}
        onPress={() => Alert.alert("Secondary Button with Icon Right")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Right}
      >
        Secondary Button
      </Button>

      <Button variant={ButtonVariants.Error} onPress={() => Alert.alert("Error Button")}>
        Error Button
      </Button>
      <Button
        variant={ButtonVariants.Error}
        onPress={() => Alert.alert("Error Button with Icon Left")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Left}
      >
        Error Button
      </Button>
      <Button
        variant={ButtonVariants.Error}
        onPress={() => Alert.alert("Error Button with Icon Right")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Right}
      >
        Error Button
      </Button>

      <Button variant={ButtonVariants.Inline} onPress={() => Alert.alert("Inline Button")}>
        Inline Button
      </Button>
      <Button
        variant={ButtonVariants.Inline}
        onPress={() => Alert.alert("Inline Button with Icon Left")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Left}
      >
        Inline Button
      </Button>
      <Button
        variant={ButtonVariants.Inline}
        onPress={() => Alert.alert("Inline Button with Icon Right")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Right}
      >
        Inline Button
      </Button>

      <Button variant={ButtonVariants.Primary} disabled onPress={() => Alert.alert("Disabled Primary Button")}>
        Disabled Primary Button
      </Button>
      <Button
        variant={ButtonVariants.Primary}
        disabled
        onPress={() => Alert.alert("Disabled Primary Button with Icon Left")}
        icon={<Close stroke={colors.neutral1000} />}
        iconPosition={ButtonIconsPosition.Left}
      >
        Disabled Primary Button
      </Button>
      <Button
        variant={ButtonVariants.Primary}
        disabled
        onPress={() => Alert.alert("Disabled Primary Button with Icon Right")}
        icon={<Close stroke={colors.neutral1000} />}
        iconPosition={ButtonIconsPosition.Right}
      >
        Disabled Primary Button
      </Button>

      <Button variant={ButtonVariants.Secondary} disabled onPress={() => Alert.alert("Disabled Secondary Button")}>
        Disabled Secondary Button
      </Button>
      <Button
        variant={ButtonVariants.Secondary}
        disabled
        onPress={() => Alert.alert("Disabled Secondary Button with Icon Left")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Left}
      >
        Disabled Secondary Button
      </Button>
      <Button
        variant={ButtonVariants.Secondary}
        disabled
        onPress={() => Alert.alert("Disabled Secondary Button with Icon Right")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Right}
      >
        Disabled Secondary Button
      </Button>

      <Button variant={ButtonVariants.Error} disabled onPress={() => Alert.alert("Disabled Error Button")}>
        Disabled Error Button
      </Button>
      <Button
        variant={ButtonVariants.Error}
        disabled
        onPress={() => Alert.alert("Disabled Error Button with Icon Left")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Left}
      >
        Disabled Error Button
      </Button>
      <Button
        variant={ButtonVariants.Error}
        disabled
        onPress={() => Alert.alert("Disabled Error Button with Icon Right")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Right}
      >
        Disabled Error Button
      </Button>

      <Button variant={ButtonVariants.Inline} disabled onPress={() => Alert.alert("Disabled Inline Button")}>
        Disabled Inline Button
      </Button>
      <Button
        variant={ButtonVariants.Inline}
        disabled
        onPress={() => Alert.alert("Disabled Inline Button with Icon Left")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Left}
      >
        Disabled Inline Button
      </Button>
      <Button
        variant={ButtonVariants.Inline}
        disabled
        onPress={() => Alert.alert("Disabled Inline Button with Icon Right")}
        icon={<Close stroke={colors.neutral0} />}
        iconPosition={ButtonIconsPosition.Right}
      >
        Disabled Inline Button
      </Button>

      <View style={styles.iconButtonRow}>
        <IconButton
          variant={ButtonVariants.Primary}
          shape={ButtonShape.Square}
          onPress={() => Alert.alert("Icon Button Primary Square")}
          icon={<Close stroke={colors.neutral1000} />}
        />
        <IconButton
          variant={ButtonVariants.Secondary}
          shape={ButtonShape.Square}
          onPress={() => Alert.alert("Icon Button Secondary Square")}
          icon={<Close stroke={colors.neutral0} />}
        />
        <IconButton
          variant={ButtonVariants.Error}
          shape={ButtonShape.Square}
          onPress={() => Alert.alert("Icon Button Error Square")}
          icon={<Close stroke={colors.neutral0} />}
        />
        <IconButton
          variant={ButtonVariants.Inline}
          shape={ButtonShape.Square}
          onPress={() => Alert.alert("Icon Button Inline Square")}
          icon={<Close stroke={colors.neutral0} />}
        />
      </View>

      <View style={styles.iconButtonRow}>
        <IconButton
          variant={ButtonVariants.Primary}
          shape={ButtonShape.Circle}
          onPress={() => Alert.alert("Icon Button Primary Circle")}
          icon={<Close stroke={colors.neutral1000} />}
        />
        <IconButton
          variant={ButtonVariants.Secondary}
          shape={ButtonShape.Circle}
          onPress={() => Alert.alert("Icon Button Secondary Circle")}
          icon={<Close stroke={colors.neutral0} />}
        />
        <IconButton
          variant={ButtonVariants.Error}
          shape={ButtonShape.Circle}
          onPress={() => Alert.alert("Icon Button Error Circle")}
          icon={<Close stroke={colors.neutral0} />}
        />
        <IconButton
          variant={ButtonVariants.Inline}
          shape={ButtonShape.Circle}
          onPress={() => Alert.alert("Icon Button Inline Circle")}
          icon={<Close stroke={colors.neutral0} />}
        />
      </View>

      <View style={styles.iconButtonRow}>
        <IconButton
          variant={ButtonVariants.Primary}
          shape={ButtonShape.Square}
          disabled
          onPress={() => Alert.alert("Disabled Icon Button Primary Square")}
          icon={<Close stroke={colors.neutral1000} />}
        />
        <IconButton
          variant={ButtonVariants.Secondary}
          shape={ButtonShape.Square}
          disabled
          onPress={() => Alert.alert("Disabled Icon Button Secondary Square")}
          icon={<Close stroke={colors.neutral0} />}
        />
        <IconButton
          variant={ButtonVariants.Error}
          shape={ButtonShape.Square}
          disabled
          onPress={() => Alert.alert("Disabled Icon Button Error Square")}
          icon={<Close stroke={colors.neutral0} />}
        />
        <IconButton
          variant={ButtonVariants.Inline}
          shape={ButtonShape.Square}
          disabled
          onPress={() => Alert.alert("Disabled Icon Button Inline Square")}
          icon={<Close stroke={colors.neutral0} />}
        />
      </View>

      <View style={styles.iconButtonRow}>
        <IconButton
          variant={ButtonVariants.Primary}
          shape={ButtonShape.Circle}
          disabled
          onPress={() => Alert.alert("Disabled Icon Button Primary Circle")}
          icon={<Close stroke={colors.neutral1000} />}
        />
        <IconButton
          variant={ButtonVariants.Secondary}
          shape={ButtonShape.Circle}
          disabled
          onPress={() => Alert.alert("Disabled Icon Button Secondary Circle")}
          icon={<Close stroke={colors.neutral0} />}
        />
        <IconButton
          variant={ButtonVariants.Error}
          shape={ButtonShape.Circle}
          disabled
          onPress={() => Alert.alert("Disabled Icon Button Error Circle")}
          icon={<Close stroke={colors.neutral0} />}
        />
        <IconButton
          variant={ButtonVariants.Inline}
          shape={ButtonShape.Circle}
          disabled
          onPress={() => Alert.alert("Disabled Icon Button Inline Circle")}
          icon={<Close stroke={colors.neutral0} />}
        />
      </View>

      <Text style={styles.text}>Commandpage</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    color: "white",
    marginTop: 20,
  },
  iconButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
})

export default ButtonPage
