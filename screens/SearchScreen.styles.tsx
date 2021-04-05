import Constants from "expo-constants"
import { StyleSheet } from "react-native"

import Colors from "../constants/Colors"

export const SEARCH_SCREEN_STYLES = StyleSheet.create({
  listEmptyComponentText: {
    color: Colors.shuttleGrey,
    fontSize: 20,
    paddingHorizontal: 50,
  },
  listEmptyComponentTouchableHighlight: {
    height: 52,
    width: "100%",
    justifyContent: "center",
  },
  itemText: {
    color: Colors.shuttleGrey,
    fontSize: 20,
    paddingHorizontal: 50,
  },
  itemTouchableHighlight: {
    height: 52,
    width: "100%",
    justifyContent: "center",
  },
  cancelTouchableOpacity: {
    marginTop: Constants.statusBarHeight,
    height: 42,
    justifyContent: "center",
  },
  cancelText: {
    color: Colors.cancelText,
    fontSize: 20,
  },
  inputViewStyles: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    marginRight: 10,
  },
  searchInput: {
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.abbey,
    color: Colors.searchInput,
    fontSize: 20,
    borderRadius: 12,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.jaguar,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: Colors.bastille,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  flatlist: {
    backgroundColor: Colors.mirage,
  },
})
