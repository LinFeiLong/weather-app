import * as React from "react"
import { StyleSheet } from "react-native"
import { gql, useQuery } from "@apollo/client"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"

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

export default function TabOneScreen() {
  const { loading, error, data } = useQuery(GET_CITY_BY_NAME, {
    variables: { name: "Gothenburg" },
  })
  if (loading) {
    return <Text>Loading ...</Text>
  }

  if (error) {
    console.log({ error })
  }

  console.log({ data })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
