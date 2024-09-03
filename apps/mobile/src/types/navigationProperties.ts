import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./rootStackParamList"
import { NavigationProp } from "@react-navigation/native"

export type ManualPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ManualPage"
>

export type ManualPageRouteProp = RouteProp<RootStackParamList, "ManualPage">

export type AutoPageConnectNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AutoPageConnect"
>

export type AutoPageConnectRouteProp = RouteProp<RootStackParamList, "AutoPageConnect">

export type CommandPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CommandPage"
>

export type AutoPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AutoPage"
>

export type ManualPageProps = {
  navigation: AutoPageConnectNavigationProp
  route: ManualPageRouteProp
}

export type AutoPageProps = {
  navigation: AutoPageNavigationProp
}

export type CommandPageProps = {
  navigation: CommandPageNavigationProp
}

export type AutoPageConnectProps = {
  navigation: ManualPageNavigationProp
  route: AutoPageConnectRouteProp
}

export type HeaderProps = {
  navigation: NavigationProp<RootStackParamList>
}
