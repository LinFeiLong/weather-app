import * as React from "react"
import { useEffect, useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import { useReactiveVar } from "@apollo/client"
import { LinearGradient } from "expo-linear-gradient"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useHeaderHeight } from "@react-navigation/stack"

import Colors from "../constants/Colors"
import { citiesInVar } from "../constants/Apollo"
import useAsyncStorage from "../hooks/useAsyncStorage"
import { WeatherItem } from "../components/WeatherItem"
import Layout from "../constants/Layout"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"

function ListHeaderComponent() {
  const headerHight = useHeaderHeight()
  return (
    <View style={{ height: headerHight, backgroundColor: "transparent" }} />
  )
}

function ListFooterComponent() {
  const insets = useSafeAreaInsets()
  return (
    <View style={{ height: insets.bottom, backgroundColor: "transparent" }} />
  )
}

function ListEmptyComponent() {
  const headerHight = useHeaderHeight()
  const navigation = useNavigation()

  return (
    <View
      style={{
        height: Layout.window.height - headerHight * 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={[styles.empty, { fontSize: 16 }]}>Your list is empty</Text>
      <Text style={[styles.empty, { marginBottom: 16 }]}>
        Let's find a city 🏙
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SearchScreen")
        }}
      >
        <Ionicons name="search" size={64} color={Colors.athensGrey} />
      </TouchableOpacity>
    </View>
  )
}

export function ListScreen() {
  const [getCities, storeCities] = useAsyncStorage("@cities")
  const [cities, setCities] = useState<string[]>([])
  const insets = useSafeAreaInsets()

  useEffect(() => {
    async function setCitiesInVar() {
      citiesInVar(await getCities())
    }
    setCitiesInVar()
  }, [])

  const citiesRV: string[] = useReactiveVar(citiesInVar)

  useEffect(() => {
    setCities(citiesRV)
    storeCities(citiesRV)
  }, [citiesRV])

  // const listHeaderComponent = () => {
  //   if (!__DEV__) {
  //     return null
  //   }
  //   return (
  //     <Button
  //       title={"citiesInVar"}
  //       onPress={() => {
  //         console.log({ citiesRV })
  //       }}
  //     />
  //   )
  // }

  return (
    <LinearGradient
      colors={[
        Colors.default.LgBackgroundTop,
        Colors.default.LgBackgroundBottom,
      ]}
      style={[styles.container]}
    >
      <FlatList
        style={{ overflow: "visible" }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <WeatherItem cityName={item} />
        }}
        data={cities}
      />
      <Text style={[styles.love, { bottom: insets.bottom }]}>
        Made with ❤️ from St-Brieuc
      </Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  contentContainerStyle: {
    backgroundColor: "transparent",
  },
  love: {
    color: Colors.athensGrey,
    fontWeight: "bold",
    alignSelf: "center",
    position: "absolute",
  },
  empty: {
    color: Colors.athensGrey,
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 24,
  },
})
