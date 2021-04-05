import * as React from "react"
import { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { useReactiveVar } from "@apollo/client"
import { LinearGradient } from "expo-linear-gradient"
import { FlatList } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useHeaderHeight } from "@react-navigation/stack"

import Colors from "../constants/Colors"
import { citiesInVar } from "../constants/Apollo"
import useAsyncStorage from "../hooks/useAsyncStorage"
import { WeatherItem } from "../components/WeatherItem"
import { View } from "../components/Themed"

export function ListScreen() {
  const insets = useSafeAreaInsets()
  const headerHight = useHeaderHeight()

  const [getCities, storeCities] = useAsyncStorage("@cities")
  const [cities, setCities] = useState<string[]>([])

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
        ListHeaderComponent={() => (
          <View
            style={{ height: headerHight, backgroundColor: "transparent" }}
          />
        )}
        ListFooterComponent={() => (
          <View
            style={{ height: insets.bottom, backgroundColor: "transparent" }}
          />
        )}
        numColumns={2}
        contentContainerStyle={{ backgroundColor: "transparent" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <WeatherItem cityName={item} />
        }}
        data={cities}
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
})
