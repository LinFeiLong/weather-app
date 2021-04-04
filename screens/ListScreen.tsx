import * as React from "react"
import { Button, Dimensions, StyleSheet } from "react-native"
import { gql, useQuery, useReactiveVar } from "@apollo/client"
import { LinearGradient } from "expo-linear-gradient"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useHeaderHeight } from "@react-navigation/stack"
import LottieView from "lottie-react-native"
import _ from "lodash"
import lookup from "country-code-lookup"
import { useNavigation } from "@react-navigation/native"

import { Text, View } from "../components/Themed"
import Icons from "../constants/Icons"
import Colors from "../constants/Colors"
import { citiesInVar } from "../constants/Apollo"
import { useEffect, useState } from "react"
import useAsyncStorage from "../hooks/useAsyncStorage"

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

/**
 * Convert temperature from Kelvin to Celcius
 */
function kToC(K: number) {
  return K - 273.15
}

function Item({ cityName }: { cityName: string }) {
  const { loading, error, data } = useQuery(GET_CITY_BY_NAME, {
    variables: { name: cityName },
    fetchPolicy: "cache-and-network",
  })
  const navigation = useNavigation()

  if (loading) {
    return <Text>Loading ...</Text>
  }

  if (error) {
    console.warn({ error })
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
    <TouchableOpacity
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
        <Text style={styles.city}>{name}</Text>
        <Text style={styles.country}>{countryName}</Text>
      </View>
    </TouchableOpacity>
  )
}

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
        ListHeaderComponent={listHeaderComponent}
        style={{ paddingTop: headerHight, paddingBottom: insets.bottom }}
        numColumns={2}
        contentContainerStyle={{ backgroundColor: "transparent" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <Item cityName={item} />
        }}
        data={cities}
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  heading: {
    padding: 16,
    fontWeight: "bold",
  },
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
