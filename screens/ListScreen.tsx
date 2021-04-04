import * as React from "react"
import { StyleSheet } from "react-native"
import { gql, useQuery } from "@apollo/client"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"

import { GET_CITY_BY_NAME_DATA } from "./ListScreen.data"
import { LinearGradient } from "expo-linear-gradient"
import Colors from "../constants/Colors"

// const GET_CITY_BY_NAME = gql`
//   query GetCityByName($name: String!) {
//     getCityByName(name: $name) {
//       id
//       name
//       country
//       coord {
//         lon
//         lat
//       }
//       weather {
//         summary {
//           title
//           description
//           icon
//         }
//         temperature {
//           actual
//           feelsLike
//           min
//           max
//         }
//         wind {
//           speed
//           deg
//         }
//         clouds {
//           all
//           visibility
//           humidity
//         }
//         timestamp
//       }
//     }
//   }
// `

export default function TabOneScreen() {
  // const { loading, error, data } = useQuery(GET_CITY_BY_NAME, {
  //   variables: { name: "Gothenburg" },
  // })
  // if (loading) {
  //   return <Text>Loading ...</Text>
  // }

  // if (error) {
  //   console.log({ error })
  // }

  // console.log({ data })

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[
        Colors.default.LgBackgroundTop,
        Colors.default.LgBackgroundBottom,
      ]}
      // style={styles.background}
      style={styles.container}
    />
    // <View style={styles.container}>
    //   <Text style={styles.title}>List Screen</Text>
    //   <View style={{}}></View>
    // </View>
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
