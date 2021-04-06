import { LinearGradient } from "expo-linear-gradient"
import * as React from "react"
import { StyleSheet, View, Text } from "react-native"
import LottieView from "lottie-react-native"
import _ from "lodash"
import { useHeaderHeight } from "@react-navigation/stack"
import TextTicker from "react-native-text-ticker"

import Icons from "../constants/Icons"
import Colors from "../constants/Colors"
import { kToC } from "../utils/temperature"
import { default as Layout } from "../constants/Layout"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export function DetailScreen({ route }) {
  const headerHight = useHeaderHeight()

  const { data, countryName, cityName } = route.params

  const {
    getCityByName: {
      name,
      country,
      weather: {
        summary: { title, description, icon },
        temperature: { actual, feelsLike, min, max },
        wind: { speed, deg },
        clouds: { all, visibility, humidity },
        timestamp,
      },
    },
  } = data

  console.log(data)

  return (
    <LinearGradient
      colors={[
        Colors.default.LgBackgroundTop,
        Colors.default.LgBackgroundBottom,
      ]}
      style={[styles.container, { paddingTop: headerHight }]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.leftContainer}>
          <View style={styles.left}>
            <TextTicker
              duration={3000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}
              style={styles.city}
            >
              {cityName}
            </TextTicker>
            <Text style={styles.country}>{countryName}</Text>
            <Text style={styles.actual}>{`${_.round(kToC(actual))}°`}</Text>
            <View style={styles.minmaxContainer}>
              <MaterialCommunityIcons
                name="chevron-up"
                size={20}
                style={styles.chevron}
              />
              <Text style={[styles.minmax, { marginRight: 4 }]}>{`${_.round(
                kToC(max)
              )}°`}</Text>
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                style={styles.chevron}
              />
              <Text style={styles.minmax}>{`${_.round(kToC(min))}°`}</Text>
            </View>
            <Text style={styles.description}>{_.upperFirst(description)}</Text>
            <Text style={styles.feelslike}>{`Feels like ${_.round(
              kToC(feelsLike)
            )}°`}</Text>
          </View>
        </View>
        <View style={styles.lottieContainer}>
          <LottieView
            autoPlay
            loop
            style={styles.lottie}
            source={Icons[icon]}
          />
        </View>
      </View>
      <View style={styles.cardFooter}></View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  leftContainer: {},
  left: {
    position: "absolute",
  },
  description: {
    color: Colors.athensGrey,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    opacity: 0.8,
  },
  container: {
    flex: 1,
  },
  lottieContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    top: -8,
    right: -8,
    width: 64 * 3,
    height: 64 * 3,
    backgroundColor: "transparent",
  },
  cardHeader: {
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    height: Layout.window.width,
    // borderBottomColor: Colors.athensGrey,
    // borderBottomWidth: 1,
  },
  cardFooter: {
    backgroundColor: "transparent",
  },
  actual: {
    marginTop: 38,
    color: Colors.athensGrey,
    fontSize: 22 * 4,
    fontWeight: "bold",
  },
  minmaxContainer: {
    flexDirection: "row",
    marginBottom: 42,
  },
  minmax: {
    color: Colors.athensGrey,
    fontSize: 16,
    fontWeight: "bold",
  },
  feelslike: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.athensGrey,
    opacity: 0.4,
  },
  city: {
    color: Colors.athensGrey,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 48,
    marginBottom: 3,
  },
  country: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.athensGrey,
  },
  chevron: {
    color: Colors.athensGrey,
    opacity: 0.4,
  },
  card: {
    backgroundColor: Colors.cardBackgroundColor,
    height: 140,
    width: Layout.window.width / 2 - 32 - 20,
    borderRadius: (Layout.window.width / 2 - 32 - 20) / 12,
    margin: 12,
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 18,
    justifyContent: "space-between",
  },
})
