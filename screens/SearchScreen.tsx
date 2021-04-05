import * as React from "react"
import { Platform, StyleSheet } from "react-native"
import SearchInput from "react-native-search-filter"

import { Text, View } from "../components/Themed"

import { citiesInVar } from "../constants/Apollo"
import _ from "lodash"
import { useState } from "react"
import { useHeaderHeight } from "@react-navigation/stack"
import Constants from "expo-constants"
import {
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler"
import { citiesList } from "../assets/cities-list"
import { useNavigation } from "@react-navigation/native"

export function SearchScreen() {
  const [searchTerm, searchUpdated] = useState("")
  const headerHeight = useHeaderHeight()
  const navigation = useNavigation()

  const filteredCitiesList = () => {
    if (searchTerm.length === 0) {
      return []
    }
    return _.filter(citiesList, (o) => {
      return _.startsWith(_.lowerCase(o), _.lowerCase(searchTerm), 0)
    })
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "transparent",
          borderBottomWidth: 2,
          borderBottomColor: "#302F34",
          paddingHorizontal: 20,
        }}
      >
        <SearchInput
          keyboardAppearance="dark"
          inlineImageLeft="search"
          accessible
          accessibilityLabel="search"
          accessibilityHint="search"
          autoCapitalize="none"
          clearButtonMode="always"
          autoFocus
          autoCorrect={false}
          placeholderTextColor="#97989B" // aluminum
          selectionColor="#FEFEFE" // romance
          returnKeyType="search"
          onChangeText={(term) => {
            searchUpdated(term)
          }}
          style={{
            ...styles.searchInput,
            height: 40,
          }}
          inputViewStyles={{
            ...styles.inputViewStyles,
            marginTop: Constants.statusBarHeight,
            height:
              headerHeight +
              Constants.statusBarHeight +
              (Platform.OS === "ios" ? -1 : 7) +
              5,
            flexGrow: 1,
            marginRight: 10,
          }}
          placeholder="Search"
        />
        <TouchableOpacity
          style={{
            marginTop: Constants.statusBarHeight,
            justifyContent: "center",
            top: -7,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              color: "#FEFEFE",
              fontSize: 20,
            }}
          >
            {"Cancel"}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#1B1A1F" }}
        data={filteredCitiesList()}
        keyExtractor={(city, index) => index.toString()}
        renderItem={({ item: city, index }) => (
          <TouchableHighlight
            underlayColor="#323338"
            onPress={() => {
              citiesInVar(_.uniq([...citiesInVar(), city]))
              navigation.goBack()
            }}
            style={{
              height: 52,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: "#636468", fontSize: 20, paddingHorizontal: 50 }}
            >
              {city}
            </Text>
          </TouchableHighlight>
        )}
        ListEmptyComponent={() => {
          if (searchTerm.length === 0) {
            return null
          }
          return (
            <TouchableHighlight
              underlayColor="#323338"
              style={{
                height: 52,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#636468",
                  fontSize: 20,
                  paddingHorizontal: 50,
                }}
              >
                No results found.
              </Text>
            </TouchableHighlight>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputViewStyles: {},
  searchInput: {
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#4F5055", // abbey
    color: "white",
    fontSize: 20,
    borderRadius: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#2A292E", // jaguar
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
