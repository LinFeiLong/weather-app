import * as React from "react"
import { useState } from "react"
import { Platform } from "react-native"
import SearchInput from "react-native-search-filter"
import _ from "lodash"
import { useHeaderHeight } from "@react-navigation/stack"
import Constants from "expo-constants"
import {
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler"
import { citiesList } from "../assets/cities-list"
import { useNavigation } from "@react-navigation/native"

import { Text, View } from "../components/Themed"
import { citiesInVar } from "../constants/Apollo"
import { SEARCH_SCREEN_STYLES as styles } from "./SearchScreen.styles"

function CancelButton() {
  const navigation = useNavigation()
  const handleOnPress = () => navigation.goBack()

  return (
    <TouchableOpacity
      style={styles.cancelTouchableOpacity}
      onPress={handleOnPress}
    >
      <Text style={styles.cancelText}>{"Cancel"}</Text>
    </TouchableOpacity>
  )
}

const filteredCitiesList = (searchTerm: string) => {
  // Shows nothing if nothing is typed
  if (searchTerm.length === 0) {
    return []
  }

  return _.filter(citiesList, (o) => {
    // We compare both strings in lowercase
    return _.startsWith(_.lowerCase(o), _.lowerCase(searchTerm), 0)
  })
}

function ListEmptyComponent() {
  return (
    <TouchableHighlight
      underlayColor="#323338"
      style={styles.listEmptyComponentTouchableHighlight}
    >
      <Text style={styles.listEmptyComponentText}>No results found.</Text>
    </TouchableHighlight>
  )
}

export function SearchScreen() {
  const [searchTerm, searchUpdated] = useState("")
  const headerHeight = useHeaderHeight()
  const navigation = useNavigation()

  const handleOnChangeText = (term: string) => {
    searchUpdated(term)
  }

  function renderItem({ item: city }: { item: string }) {
    const handleOnPress = () => {
      citiesInVar(_.uniq([...citiesInVar(), city]))
      navigation.goBack()
    }

    return (
      <TouchableHighlight
        underlayColor="#323338"
        onPress={handleOnPress}
        style={styles.itemTouchableHighlight}
      >
        <Text style={styles.itemText}>{city}</Text>
      </TouchableHighlight>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
          onChangeText={handleOnChangeText}
          style={styles.searchInput}
          inputViewStyles={{
            ...styles.inputViewStyles,
            height:
              headerHeight +
              Constants.statusBarHeight +
              (Platform.OS === "ios" ? -1 : 7) +
              5,
          }}
          placeholder="Search"
        />
        <CancelButton />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
        data={filteredCitiesList(searchTerm)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          !(searchTerm.length === 0) ? null : ListEmptyComponent
        }
      />
    </View>
  )
}
