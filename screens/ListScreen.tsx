import * as React from "react"
import { Dimensions, StyleSheet } from "react-native"
import { gql, useQuery } from "@apollo/client"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"

import { GET_CITY_BY_NAME_DATA } from "./ListScreen.data"
import { LinearGradient } from "expo-linear-gradient"
import Colors from "../constants/Colors"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useHeaderHeight } from "@react-navigation/stack"

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

export function ListScreen() {
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

  const insets = useSafeAreaInsets()
  const headerHight = useHeaderHeight()

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[
        Colors.default.LgBackgroundTop,
        Colors.default.LgBackgroundBottom,
      ]}
      // start={[20, 0]}
      // end={[80, 0]}
      style={styles.container}
    >
      <FlatList
        // contentContainerStyle={{ marginHorizontal: 32 }}
        style={{ paddingTop: headerHight, paddingBottom: insets.bottom }}
        numColumns={2}
        contentContainerStyle={{ backgroundColor: "transparent" }}
        renderItem={({ index }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{`${index}°`}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.city}>City</Text>
              <Text style={styles.country}>Country</Text>
            </View>
          </View>
        )}
        data={[{}, {}, {}]}
      ></FlatList>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  cardHeader: {
    backgroundColor: "transparent",
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
