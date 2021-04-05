import { gql, useQuery } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import RNBounceable from "@freakycoder/react-native-bounceable"
import React from "react"
import { Dimensions, Text, View, StyleSheet } from "react-native"
import LottieView from "lottie-react-native"
import lookup from "country-code-lookup"
import _ from "lodash"

import Icons from "../constants/Icons"
import { kToC, kToF } from "../utils/temperature"

const GET_CITY_BY_NAME = gql`
  query GetCityByName($name: String!) {
    getCityByName(name: $name) {
      id
      name
      country
      coord {
        lon
        lat
      }
      weather {
        summary {
          title
          description
          icon
        }
        temperature {
          actual
          feelsLike
          min
          max
        }
        wind {
          speed
          deg
        }
        clouds {
          all
          visibility
          humidity
        }
        timestamp
      }
    }
  }
`

export function WeatherItem({ cityName }: { cityName: string }) {
  const { loading, error, data } = useQuery(GET_CITY_BY_NAME, {
    variables: { name: cityName },
    fetchPolicy: "cache-first",
  })

  const navigation = useNavigation()

  if (loading) {
    return <Text>Loading ...</Text>
  }

  if (error) {
    console.warn({ error })
  }

  if (!data?.getCityByName) {
    return (
      <RNBounceable style={[styles.card, { opacity: 0.25 }]} disabled>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>N/A</Text>
          <View style={styles.lottie} />
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.city}>{cityName}</Text>
          <Text style={styles.country} />
        </View>
      </RNBounceable>
    )
  }

  const {
    getCityByName: {
      country,
      name,
      weather: {
        summary: { icon },
        temperature: { actual },
      },
    },
  } = data

  const countryName = lookup.byIso(country).country

  return (
    <RNBounceable
      style={styles.card}
      onPress={() => {
        navigation.navigate("DetailScreen")
      }}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{`${_.round(kToC(actual))}°`}</Text>
        <LottieView autoPlay loop style={styles.lottie} source={Icons[icon]} />
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.city}>{cityName}</Text>
        <Text style={styles.country}>{countryName}</Text>
      </View>
    </RNBounceable>
  )
}

const styles = StyleSheet.create({
  lottie: {
    top: -2,
    right: -2,
    width: 64,
    height: 64,
    backgroundColor: "transparent",
  },
  cardHeader: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardFooter: {
    backgroundColor: "transparent",
  },
  title: {
    color: "#F0F1F4",
    fontSize: 22,
    fontWeight: "bold",
  },
  city: {
    color: "#F0F1F4",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 3,
  },
  country: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#F0F1F4",
    opacity: 0.4,
  },
  card: {
    backgroundColor: "#ACB8C7",
    height: 140,
    width: Dimensions.get("window").width / 2 - 32 - 20,
    borderRadius: (Dimensions.get("window").width / 2 - 32 - 20) / 12,
    margin: 12,
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 18,
    justifyContent: "space-between",
  },
})
