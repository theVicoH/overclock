import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types/root-stack-param-list'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import HomeScreen from './routes/home'
import DetailsScreen from './routes/details'
import AbracadabraScreen from './routes/abracadabra'

const Stack = createNativeStackNavigator<RootStackParamList>()
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Overview' }}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Abracadabra" component={AbracadabraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
