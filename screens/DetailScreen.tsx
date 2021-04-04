import { LinearGradient } from "expo-linear-gradient"
import * as React from "react"
import { StyleSheet } from "react-native"

import Colors from "../constants/Colors"

export function DetailScreen() {
  return (
    <LinearGradient
      colors={[
        Colors.default.LgBackgroundTop,
        Colors.default.LgBackgroundBottom,
      ]}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
