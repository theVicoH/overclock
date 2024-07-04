import React, { useRef } from "react"
import { Pressable, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle, View, Animated } from "react-native"
import fontStyles from "../fontStyles"
import { colors } from "common/styles"
import { ButtonVariants, ButtonIconsPosition } from "../types/buttons"

type Props = {
  variant?: ButtonVariants.Primary | ButtonVariants.Secondary | ButtonVariants.Error | ButtonVariants.Inline
  onPress?: (event: GestureResponderEvent) => void
  disabled?: boolean
  children: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: ButtonIconsPosition.Left | ButtonIconsPosition.Right
}

const Button: React.FC<Props> = ({
  variant = ButtonVariants.Primary,
  onPress,
  disabled = false,
  children,
  icon,
  iconPosition = ButtonIconsPosition.Left,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current

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

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case ButtonVariants.Primary:
        return styles.textBlack
      case ButtonVariants.Secondary:
        return styles.textWhite
      case ButtonVariants.Error:
        return styles.textWhite
      case ButtonVariants.Inline:
        return styles.textWhite
      default:
        return styles.textWhite
    }
  }

  const getPaddingStyle = (): ViewStyle => {
    if (icon) {
      if (iconPosition === ButtonIconsPosition.Left) {
        return styles.paddingLeftIcon
      } else if (iconPosition === ButtonIconsPosition.Right) {
        return styles.paddingRightIcon
      }
    }
    return styles.paddingNoIcon
  }

  const backgroundStyle = getBackgroundStyle()
  const textStyle = getTextStyle()
  const paddingStyle = getPaddingStyle()

  return (
    <Pressable
      style={({ pressed }) => [styles.touchableContainer, pressed && !disabled && { transform: [{ scale: 0.9 }] }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      role="button"
      aria-disabled={disabled}
    >
      <Animated.View style={[styles.buttonInnerContainer, { transform: [{ scale: scaleValue }] }]}>
        <View style={[styles.background, backgroundStyle]} testID="background" />
        <View style={[styles.buttonContent, paddingStyle]}>
          {icon && iconPosition === ButtonIconsPosition.Left && (
            <View style={[styles.iconLeft, disabled && styles.disabledIcon]}>{icon}</View>
          )}
          <Text style={[fontStyles.notoSansSemiBold, textStyle, disabled && styles.disabledText]}>{children}</Text>
          {icon && iconPosition === ButtonIconsPosition.Right && (
            <View style={[styles.iconRight, disabled && styles.disabledIcon]}>{icon}</View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  touchableContainer: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  buttonInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
    position: "relative",
  },
  paddingLeftIcon: {
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 18,
  },
  paddingRightIcon: {
    paddingVertical: 8,
    paddingLeft: 18,
    paddingRight: 16,
  },
  paddingNoIcon: {
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 40,
  },
  textBlack: {
    color: colors.neutral1000,
    fontSize: 14,
  },
  textWhite: {
    color: colors.neutral0,
    fontSize: 14,
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
    opacity: 0.2,
    borderWidth: 1,
    borderColor: colors.neutral400,
    borderStyle: "solid",
  },
  secondaryBackgroundDisabled: {
    backgroundColor: colors.neutral400,
    opacity: 0.1,
    borderWidth: 1,
    borderColor: colors.neutral400,
    borderStyle: "solid",
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
  disabledText: {
    opacity: 0.5,
  },
  disabledIcon: {
    opacity: 0.5,
  },
  iconLeft: {
    marginRight: 4,
  },
  iconRight: {
    marginLeft: 4,
  },
})

export default Button
