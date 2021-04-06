import { Platform, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { default as Layout } from "../constants/Layout"

export const WEATHER_ITEM_STYLES = StyleSheet.create({
  deleteButtonContainer: {
    position: "absolute",
    ...Platform.select({
      android: {
        top: 5,
        left: 5,
      },
    }),
    zIndex: 100,
  },
  deleteButtonTouchableOpacity: {
    height: 25,
    width: 25,
    backgroundColor: Colors.mystic,
    borderRadius: 25 / 2,
  },
  deleteButtonIcon: {
    color: Colors.chambrey,
  },

  lottie: {
    top: -2,
    right: -2,
    width: 64,
    height: 64,
    backgroundColor: "transparent",
  },
  cardHeader: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardFooter: {
    backgroundColor: "transparent",
    height: 42,
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
    alignSelf: "stretch",
  },
  country: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#F0F1F4",
    opacity: 0.4,
  },
  card: {
    backgroundColor: "#ACB8C7", // Cadet Blue
    height: 140,
    width: Layout.window.width / 2 - 32 - 20,
    borderRadius: (Layout.window.width / 2 - 32 - 20) / 12,
    margin: 12,
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 18,
    justifyContent: "space-between",
  },
})
