import * as React from "react"
import { StyleSheet } from "react-native"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"

import { citiesInVar } from "../constants/Apollo"
import _ from "lodash"

export function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          citiesInVar(_.uniq([...citiesInVar(), "New York"]))
        }}
        style={styles.title}
      >
        Search Screen
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/SearchScreen.tsx" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
