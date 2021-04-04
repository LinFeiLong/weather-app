import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"
import { ColorSchemeName } from "react-native"

import { RootStackParamList } from "../types"
import {
  ListScreen,
  SearchScreen,
  DetailScreen,
  NotFoundScreen,
} from "../screens"
import LinkingConfiguration from "./LinkingConfiguration"
import { MaterialCommunityIcons } from "@expo/vector-icons"

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
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitleStyle: { color: "white" },
        headerLeftContainerStyle: { marginLeft: 32 },
        headerRightContainerStyle: { marginRight: 32 },
      }}
    >
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={({ navigation }) => ({
          headerTitle: "Add city",
          headerRight: () => (
            <MaterialCommunityIcons
              name="plus"
              size={32}
              color="white"
              onPress={() => {
                navigation.navigate("SearchScreen")
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={({ navigation }) => ({
          headerTitle: "Date",
          headerLeft: () => (
            <MaterialCommunityIcons
              name="menu"
              size={32}
              color="white"
              onPress={() => {
                navigation.navigate("ListScreen")
              }}
            />
          ),
          headerRight: () => (
            // TODO: make a switch for temperature type.
            <MaterialCommunityIcons
              name="temperature-celsius"
              size={32}
              color="white"
            />
            // <MaterialCommunityIcons
            //   name="temperature-fahrenheit"
            //   size={32}
            //   color="white"
            // />
          ),
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  )
}
