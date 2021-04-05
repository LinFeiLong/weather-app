import { StatusBar } from "expo-status-bar"
import React, { useCallback, useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import * as Animatable from "react-native-animatable"

import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { citiesInVar } from "./constants/Apollo"
import { Button, DevSettings, StyleSheet, Text, View } from "react-native"

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const [persistor, setPersistor] = useState<
    CachePersistor<NormalizedCacheObject>
  >()

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              cities: {
                read() {
                  return citiesInVar()
                },
              },
            },
          },
        },
      })
      let newPersistor = new CachePersistor({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
        debug: __DEV__,
        trigger: "write",
      })
      await newPersistor.restore()
      setPersistor(newPersistor)
      setClient(
        new ApolloClient({
          uri: "https://graphql-weather-api.herokuapp.com/",
          cache,
          connectToDevTools: true,
        })
      )
    }

    init().catch(console.error)

    // Init custom animations
    Animatable.initializeRegistryWithDefinitions({
      MyShake: {
        0: {
          transform: [{ rotateZ: -0.04 }],
        },
        0.5: {
          transform: [{ rotateZ: 0.04 }],
        },
        1: {
          transform: [{ rotateZ: -0.04 }],
        },
      },
    })
  }, [])

  // const clearCache = useCallback(() => {
  //   if (!persistor) {
  //     return
  //   }
  //   persistor.purge()
  // }, [persistor])

  // const reload = useCallback(() => {
  //   DevSettings.reload()
  // }, [])

  if (!client) {
    return <Text style={styles.heading}>Initializing app...</Text>
  }

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="light" />

          {/* DEBUG */}
          {/* {__DEV__ && (
            <View style={styles.controls}>
              <Button title={"Clear cache"} onPress={clearCache} />
              <Button
                title={"Reload app (requires dev mode)"}
                onPress={reload}
              />
            </View>
          )} */}
        </SafeAreaProvider>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    padding: 16,
    fontWeight: "bold",
  },
  item: {
    padding: 16,
  },
  mission: {},
  launchDate: {
    fontSize: 12,
  },
  content: { flex: 1 },
  controls: { flex: 0 },
})
