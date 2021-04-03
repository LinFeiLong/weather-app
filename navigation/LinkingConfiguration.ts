import * as Linking from "expo-linking"

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          List: {
            screens: {
              ListScreen: "list",
            },
          },
          Search: {
            screens: {
              SearchScreen: "search",
            },
          },
          Detail: {
            screens: {
              DetailScreen: "detail",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
}
