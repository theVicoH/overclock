import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from './root-stack-param-list'

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>

export type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>

export type AbracadabraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Abracadabra'
>

export type HomeNavigationProperties = {
  navigation: AbracadabraScreenNavigationProp;
}

export type DetailsNavigationProperties = {
  navigation: DetailsScreenNavigationProp;
}

export type AbracadabraNavigationProperties = {
  navigation: AbracadabraScreenNavigationProp;
}
