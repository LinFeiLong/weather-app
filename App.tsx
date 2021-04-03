import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client"

import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://graphql-weather-api.herokuapp.com/",
  cache: new InMemoryCache(),
})

client
  .query({
    query: gql`
      getCityByName(name: "Gothenburg") {
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
    `
  })
  .then((result) => console.log(result))

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    )
  }
}
