import * as React from "react"
import { Platform, StyleSheet } from "react-native"
import SearchInput, { createFilter } from "react-native-search-filter"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"

import { citiesInVar } from "../constants/Apollo"
import _ from "lodash"
import { useState } from "react"
import { useHeaderHeight } from "@react-navigation/stack"
import Constants from "expo-constants"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { citiesList } from "../assets/cities-list"
import { useNavigation } from "@react-navigation/native"

export function SearchScreen() {
  const [searchTerm, searchUpdated] = useState("")
  const headerHeight = useHeaderHeight()
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <SearchInput
        accessible
        accessibilityLabel="search"
        accessibilityHint="search"
        autoCapitalize="none"
        clearButtonMode="always"
        autoFocus
        autoCorrect={false}
        // selectionColor={}
        returnKeyType="search"
        onChangeText={(term) => {
          searchUpdated(term)
        }}
        style={{
          ...styles.searchInput,
          marginTop: Constants.statusBarHeight,
          height:
            headerHeight +
            Constants.statusBarHeight +
            (Platform.OS === "ios" ? -1 : 7),
        }}
        placeholder="  Search ..."
      />
      <FlatList
        style={{ alignSelf: "stretch" }}
        data={citiesList}
        keyExtractor={(city, index) => index.toString()}
        renderItem={({ item: city, index }) => (
          <TouchableOpacity
            onPress={() => {
              citiesInVar(_.uniq([...citiesInVar(), city]))
              navigation.goBack()
            }}
            style={{
              height: 42,
              width: "100%",
              backgroundColor: "red",
            }}
          >
            <Text>{city}</Text>
          </TouchableOpacity>
        )}
      />
      {/* <Text
        onPress={() => {
          citiesInVar(_.uniq([...citiesInVar(), "New York"]))
        }}
        style={styles.title}
      >
        Search Screen
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/SearchScreen.tsx" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    // borderColor: color.palette.geyser,
    // borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "grey",
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
