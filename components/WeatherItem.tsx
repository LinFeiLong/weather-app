import { useQuery, useReactiveVar } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import LottieView from "lottie-react-native"
import lookup from "country-code-lookup"
import _ from "lodash"
import * as Animatable from "react-native-animatable"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import TextTicker from "react-native-text-ticker"
import * as Haptics from "expo-haptics"

import { citiesInVar, editModeInVar } from "../constants/Apollo"
import Icons from "../constants/Icons"
import { kToC } from "../utils/temperature"
import { GET_CITY_BY_NAME } from "./WeatherItem.gql"
import { WEATHER_ITEM_STYLES as styles } from "./WeatherItem.styles"

interface WeatherItemProps {
  cityName: string
}

interface ItemContainerProps {
  children: React.ReactElement | React.ReactElement[]
  disabled?: boolean
}

const DEFAULT_WEATHER_DATA = {
  getCityByName: {
    name: "",
    country: "",
    weather: {
      summary: { title: "", description: "", icon: "" },
      temperature: { actual: "", feelsLike: "", min: "", max: "" },
      wind: { speed: "", deg: "" },
      clouds: { all: "", visibility: "", humidity: "" },
      timestamp: "",
    },
  },
}

export const WeatherItem = React.memo(function WeatherItem({
  cityName,
}: WeatherItemProps) {
  const { loading, error, data } = useQuery(GET_CITY_BY_NAME, {
    variables: { name: cityName },
    fetchPolicy: "cache-and-network",
    pollInterval: 60000, // 1 minute
  })
  const editModeRV: boolean = useReactiveVar(editModeInVar)
  const [weatherData, setWeatherData] = useState(DEFAULT_WEATHER_DATA)

  useEffect(() => {
    setWeatherData(data)
  }, [data])

  const navigation = useNavigation()

  function ItemContainer({ children, disabled }: ItemContainerProps) {
    const handleOnPress = () => {
      if (!editModeRV) {
        navigation.navigate("DetailScreen", { data, countryName, cityName })
      }
    }
    const handleOnLongPress = () => {
      if (!editModeRV) {
        editModeInVar(true)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      }
    }

    return (
      <TouchableOpacity
        onPress={() => {
          if (!disabled) {
            handleOnPress()
          }
        }}
        onLongPress={handleOnLongPress}
        activeOpacity={0.5}
      >
        <Animatable.View
          animation={!editModeRV ? "" : "MyShake"}
          duration={250}
          iterationCount="infinite"
        >
          {children}
        </Animatable.View>
      </TouchableOpacity>
    )
  }

  function DeleteButton() {
    const handleOnPress = () => {
      const newList = _.pull([...citiesInVar()], cityName)
      citiesInVar(newList)
      if (_.isEmpty(newList)) {
        editModeInVar(false)
      }
    }

    return (
      <View
        style={{
          ...styles.deleteButtonContainer,
          opacity: !editModeRV ? 0 : 1,
        }}
      >
        <TouchableOpacity
          style={styles.deleteButtonTouchableOpacity}
          onPress={handleOnPress}
        >
          <MaterialCommunityIcons
            name="minus"
            size={25}
            style={styles.deleteButtonIcon}
          />
        </TouchableOpacity>
      </View>
    )
  }

  if (error) {
    console.warn({ error })
  }

  // WeatherItem whitout data
  if (!weatherData?.getCityByName) {
    return (
      <ItemContainer disabled>
        <DeleteButton />
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>N/A</Text>
            <View style={styles.lottie} />
          </View>
          <View style={styles.cardFooter} pointerEvents="none">
            <TextTicker
              duration={1000}
              loop
              repeatSpacer={50}
              marqueeDelay={1000}
              style={styles.city}
            >
              {cityName}
            </TextTicker>
            <Text style={styles.country} />
          </View>
        </View>
      </ItemContainer>
    )
  }

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
  } = weatherData

  // WeatherItem loading
  if (loading) {
    return (
      <ItemContainer disabled>
        <DeleteButton />
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>
              {actual && `${_.round(kToC(actual))}°`}
            </Text>
            {icon !== "" && (
              <LottieView
                autoPlay
                loop
                style={styles.lottie}
                source={Icons[icon]}
              />
            )}
          </View>
          <View style={styles.cardFooter} pointerEvents="none">
            <TextTicker
              duration={1000}
              loop
              repeatSpacer={50}
              marqueeDelay={1000}
              style={styles.city}
            >
              {cityName}
            </TextTicker>
            <Text style={styles.country} />
          </View>
        </View>
      </ItemContainer>
    )
  }

  const countryName = lookup.byIso(country).country

  return (
    <ItemContainer disabled={editModeRV}>
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
        <View style={styles.cardFooter} pointerEvents="none">
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
          <TextTicker
            duration={3000}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={1000}
            style={styles.country}
          >
            {countryName}
          </TextTicker>
        </View>
      </View>
    </ItemContainer>
  )
})
