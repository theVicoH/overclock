import React from "react"
import { Pressable, StyleSheet, GestureResponderEvent, ViewStyle, View, Animated } from "react-native"
import { colors } from "common/styles"
import { ButtonShape, ButtonVariants } from "../types/buttons"

type Props = {
  variant?: ButtonVariants
  onPress?: (event: GestureResponderEvent) => void
  disabled?: boolean
  icon: React.ReactNode
  shape?: ButtonShape.Square | ButtonShape.Circle
}

const IconButton: React.FC<Props> = ({ variant = ButtonVariants.Primary, onPress, disabled = false, icon, shape = ButtonShape.Square }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const getBackgroundStyle = (): ViewStyle => {
    switch (variant) {
      case ButtonVariants.Primary:
        return disabled ? styles.primaryBackgroundDisabled : styles.primaryBackground
      case ButtonVariants.Secondary:
        return disabled ? styles.secondaryBackgroundDisabled : styles.secondaryBackground
      case ButtonVariants.Error:
        return disabled ? styles.errorBackgroundDisabled : styles.errorBackground
      case ButtonVariants.Inline:
        return disabled ? styles.inlineBackgroundDisabled : styles.inlineBackground
      default:
        return disabled ? styles.primaryBackgroundDisabled : styles.primaryBackground
    }
  }

  const getIconStyle = (): ViewStyle => {
    return disabled ? styles.disabledIcon : styles.icon
  }

  const getShapeStyle = (): ViewStyle => {
    return shape === ButtonShape.Circle ? styles.circleShape : styles.squareShape
  }

  const getBackgroundShapeStyle = (): ViewStyle => {
    return shape === ButtonShape.Circle ? styles.circleBackground : styles.squareBackground
  }

  const backgroundStyle = getBackgroundStyle()
  const iconStyle = getIconStyle()
  const shapeStyle = getShapeStyle()
  const backgroundShapeStyle = getBackgroundShapeStyle()

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.touchableContainer]}
      testID="button"
    >
      <Animated.View style={[styles.buttonInnerContainer, shapeStyle, { transform: [{ scale: scaleValue }] }]}>
        <View style={[styles.background, backgroundStyle, backgroundShapeStyle]} testID="background" />
        <View style={[styles.iconContainer, iconStyle]} testID="iconContainer">
          {icon}
        </View>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  touchableContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circleShape: {
    padding: 12,
  },
  squareShape: {
    padding: 8,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  circleBackground: {
    borderRadius: 40,
  },
  squareBackground: {
    borderRadius: 6,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  primaryBackground: {
    backgroundColor: colors.primary500,
  },
  primaryBackgroundDisabled: {
    backgroundColor: colors.primary500,
    opacity: 0.5,
  },
  secondaryBackground: {
    backgroundColor: colors.neutral400,
    borderWidth: 1,
    borderColor: colors.neutral400,
    opacity: 0.2,
  },
  secondaryBackgroundDisabled: {
    backgroundColor: colors.neutral400,
    borderWidth: 1,
    borderColor: colors.neutral400,
    opacity: 0.1,
  },
  errorBackground: {
    backgroundColor: colors.red500,
  },
  errorBackgroundDisabled: {
    backgroundColor: colors.red500,
    opacity: 0.5,
  },
  inlineBackground: {
    backgroundColor: "transparent",
  },
  inlineBackgroundDisabled: {
    backgroundColor: "transparent",
    opacity: 0.5,
  },
  icon: {
    opacity: 1,
  },
  disabledIcon: {
    opacity: 0.5,
  },
})

export default IconButton
