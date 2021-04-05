import Constants from "expo-constants"
import { StyleSheet } from "react-native"

export const SEARCH_SCREEN_STYLES = StyleSheet.create({
  listEmptyComponentText: {
    color: "#636468",
    fontSize: 20,
    paddingHorizontal: 50,
  },
  listEmptyComponentTouchableHighlight: {
    height: 52,
    width: "100%",
    justifyContent: "center",
  },
  itemText: {
    color: "#636468",
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
    justifyContent: "center",
    top: -7,
  },
  cancelText: {
    color: "#FEFEFE",
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
    backgroundColor: "#4F5055", // abbey
    color: "white",
    fontSize: 20,
    borderRadius: 12,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#2A292E", // jaguar
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: "#302F34",
    paddingHorizontal: 20,
  },
  flatlist: {
    backgroundColor: "#1B1A1F",
  },
})
