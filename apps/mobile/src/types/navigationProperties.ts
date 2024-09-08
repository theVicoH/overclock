import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./rootStackParamList"
import { NavigationProp } from "@react-navigation/native"

export type ModeSelectionPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ModeSelectionPage"
>

export type ModeSelectionPageRouteProp = RouteProp<RootStackParamList, "ModeSelectionPage">

export type ManualPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ManualPage"
>

export type AutoPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AutoPage"
>

export type AutoPageProps = {
  navigation: AutoPageNavigationProp
}

export type ManualPageProps = {
  navigation: ManualPageNavigationProp
}

export type ModeSelectionPageConnectProps = {
  navigation: ModeSelectionPageNavigationProp
  route: ModeSelectionPageRouteProp
}

export type HeaderProps = {
  navigation: NavigationProp<RootStackParamList>
}
