import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./rootStackParamList"

export type ManualPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ManualPage"
>

export type ManualPageRouteProp = RouteProp<RootStackParamList, "ManualPage">

export type AutoPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AutoPage"
>

export type AutoPageRouteProp = RouteProp<RootStackParamList, "AutoPage">

export type ManualPageNavigationProperties = {
  navigation: AutoPageNavigationProp
  route: ManualPageRouteProp
}

export type AutoPageNavigationProperties = {
  navigation: ManualPageNavigationProp
  route: AutoPageRouteProp
}
