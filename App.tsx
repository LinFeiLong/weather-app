import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://graphql-weather-api.herokuapp.com/",
  cache: new InMemoryCache(),
})

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
