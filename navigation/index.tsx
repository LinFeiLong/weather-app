import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"
import { ColorSchemeName } from "react-native"

import NotFoundScreen from "../screens/NotFoundScreen"
import { RootStackParamList } from "../types"
import TabOneScreen from "../screens/ListScreen"
import LinkingConfiguration from "./LinkingConfiguration"

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ListScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="ListScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  )
}
