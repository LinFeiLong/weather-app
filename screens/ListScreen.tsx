import * as React from "react"
import { Button, Dimensions, StyleSheet } from "react-native"
import { useReactiveVar } from "@apollo/client"
import { LinearGradient } from "expo-linear-gradient"
import { FlatList } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useHeaderHeight } from "@react-navigation/stack"

import Colors from "../constants/Colors"
import { citiesInVar } from "../constants/Apollo"
import { useEffect, useState } from "react"
import useAsyncStorage from "../hooks/useAsyncStorage"
import { WeatherItem } from "../components/WeatherItem"

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

  const listHeaderComponent = () => {
    if (!__DEV__) {
      return null
    }
    return (
      <Button
        title={"citiesInVar"}
        onPress={() => {
          console.log({ citiesRV })
        }}
      />
    )
  }

  return (
    <LinearGradient
      colors={[
        Colors.default.LgBackgroundTop,
        Colors.default.LgBackgroundBottom,
      ]}
      style={styles.container}
    >
      <FlatList
        // ListHeaderComponent={listHeaderComponent}
        style={{ paddingTop: headerHight, paddingBottom: insets.bottom }}
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
    alignItems: "center",
    justifyContent: "center",
  },
})
