import { gql, useQuery } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import RNBounceable from "@freakycoder/react-native-bounceable"
import React from "react"
import { Dimensions, Text, View, StyleSheet, Vibration } from "react-native"
import LottieView from "lottie-react-native"
import lookup from "country-code-lookup"
import _ from "lodash"
import * as Animatable from "react-native-animatable"

import Icons from "../constants/Icons"
import { kToC, kToF } from "../utils/temperature"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { citiesInVar } from "../constants/Apollo"

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
interface WeatherItemProps {
  cityName: string
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const WeatherItem = React.memo(function WeatherItem({
  cityName,
  editMode,
  setEditMode,
}: WeatherItemProps) {
  const { loading, error, data } = useQuery(GET_CITY_BY_NAME, {
    variables: { name: cityName },
    fetchPolicy: "cache-first",
  })

  const navigation = useNavigation()

  function ItemContainer({
    children,
  }: {
    children: React.ReactElement | React.ReactElement[]
  }) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (!editMode) {
            navigation.navigate("DetailScreen", { data, countryName, cityName })
          }
        }}
        onLongPress={() => {
          if (!editMode) {
            setEditMode(true)
            Vibration.vibrate(0)
          }
        }}
      >
        <Animatable.View
          animation={!editMode ? "" : "MyShake"}
          duration={250}
          iterationCount="infinite"
        >
          {children}
        </Animatable.View>
      </TouchableWithoutFeedback>
    )
  }

  function DeleteButton() {
    return (
      <View
        style={{
          position: "absolute",
          zIndex: 100,
          opacity: !editMode ? 0 : 1,
        }}
      >
        <TouchableOpacity
          style={{
            height: 25,
            width: 25,
            backgroundColor: "#E0E5F1", // Mystic
            borderRadius: 25 / 2,
          }}
          onPress={() => {
            citiesInVar(_.pull([...citiesInVar()], cityName))
          }}
        >
          <MaterialCommunityIcons name="minus" size={25} />
        </TouchableOpacity>
      </View>
    )
  }

  if (error) {
    console.warn({ error })
  }

  // WeatherItem whitout data
  if (loading || !data?.getCityByName) {
    return (
      <ItemContainer>
        <DeleteButton />
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            {loading ? (
              <Text>Loading ...</Text>
            ) : (
              <Text style={styles.title}>N/A</Text>
            )}
            <View style={styles.lottie} />
          </View>
          <View style={styles.cardFooter}>
            <Text
              style={styles.city}
              adjustsFontSizeToFit
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {cityName}
            </Text>
            <Text style={styles.country} />
          </View>
        </View>
      </ItemContainer>
    )
  }

  // WeatherItem with data
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
    <ItemContainer>
      <DeleteButton />
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{`${_.round(kToC(actual))}°`}</Text>
          <LottieView
            autoPlay
            loop
            style={styles.lottie}
            source={Icons[icon]}
          />
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.city}>{cityName}</Text>
          <Text style={styles.country}>{countryName}</Text>
        </View>
      </View>
    </ItemContainer>
  )
})

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
    height: 42,
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
    alignSelf: "stretch",
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
