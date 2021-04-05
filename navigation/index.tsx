import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"
import { ColorSchemeName, View, Text } from "react-native"

import { RootStackParamList } from "../types"
import {
  ListScreen,
  SearchScreen,
  DetailScreen,
  NotFoundScreen,
} from "../screens"
import LinkingConfiguration from "./LinkingConfiguration"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useReactiveVar } from "@apollo/client"
import { editModeInVar } from "../constants/Apollo"
import { TouchableOpacity } from "react-native-gesture-handler"
import Colors from "../constants/Colors"

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
  const editModeRV: boolean = useReactiveVar(editModeInVar)

  return (
    <Stack.Navigator
      initialRouteName="ListScreen"
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitleStyle: { color: Colors.athensGrey },
        headerLeftContainerStyle: { marginLeft: 32 },
        headerRightContainerStyle: { marginRight: 32 },
      }}
    >
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={({ navigation }) => ({
          headerTitle: !editModeRV ? "Weather App" : "",
          headerRight: () => (
            <>
              {!editModeRV ? (
                <View style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="search"
                    size={32}
                    color={Colors.athensGrey}
                    onPress={() => {
                      navigation.navigate("SearchScreen")
                    }}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    backgroundColor: Colors.mystic,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 20,
                  }}
                  onPress={() => {
                    editModeInVar(false)
                  }}
                >
                  <Text
                    style={{
                      color: Colors.chambrey, // Chambrey
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              )}
            </>
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
          headerTitle: "",
          headerLeft: () => (
            <MaterialCommunityIcons
              name="menu"
              size={32}
              color={Colors.athensGrey}
              onPress={() => {
                navigation.navigate("ListScreen")
              }}
            />
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
