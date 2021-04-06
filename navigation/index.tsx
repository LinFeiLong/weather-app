import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"
import { ColorSchemeName, View, Text, StyleSheet, Platform } from "react-native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useReactiveVar } from "@apollo/client"
import { editModeInVar } from "../constants/Apollo"
import { TouchableOpacity } from "react-native-gesture-handler"

import { RootStackParamList } from "../types"
import {
  ListScreen,
  SearchScreen,
  DetailScreen,
  NotFoundScreen,
} from "../screens"
import LinkingConfiguration from "./LinkingConfiguration"
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"

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

  function DoneButton() {
    const handleOnPress = () => {
      editModeInVar(false)
    }

    return (
      <TouchableOpacity
        style={styles.doneButtonTouchableOpacity}
        onPress={handleOnPress}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    )
  }
  return (
    <Stack.Navigator
      initialRouteName="ListScreen"
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitleStyle: { color: Colors.athensGrey },
        headerLeftContainerStyle: { marginLeft: Layout.headerHorizontalMargin },
        headerRightContainerStyle: {
          marginRight: Layout.headerHorizontalMargin,
        },
        animationEnabled: Platform.OS === "ios",
      }}
    >
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={({ navigation }) => ({
          headerTitle: !editModeRV ? "Weather App" : "",
          headerTitleStyle: { alignSelf: "center", color: Colors.athensGrey },
          headerLeft: () => (
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="search"
                size={Layout.headerIconSize}
                color={Colors.athensGrey}
                style={{ opacity: 0 }}
              />
            </View>
          ),
          headerRight: () => (
            <>
              {!editModeRV ? (
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    navigation.navigate("SearchScreen")
                  }}
                >
                  <Ionicons
                    name="search"
                    size={Layout.headerIconSize}
                    color={Colors.athensGrey}
                  />
                </TouchableOpacity>
              ) : (
                <DoneButton />
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ListScreen")
              }}
            >
              <MaterialCommunityIcons
                name="menu"
                size={Layout.headerIconSize}
                color={Colors.athensGrey}
              />
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  doneButtonTouchableOpacity: {
    flexDirection: "row",
    backgroundColor: Colors.mystic,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  doneButtonText: {
    color: Colors.chambrey,
    fontWeight: "bold",
    fontSize: 16,
  },
})
