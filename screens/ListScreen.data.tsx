const GET_CITY_BY_NAME_DATA = {
  data: {
    getCityByName: {
      __typename: "City",
      coord: {
        __typename: "Coordinates",
        lat: 57.7072,
        lon: 11.9668,
      },
      country: "SE",
      id: "2711537",
      name: "Gothenburg",
      weather: {
        __typename: "Weather",
        clouds: {
          __typename: "Clouds",
          all: 0,
          humidity: 86,
          visibility: 10000,
        },
        summary: {
          __typename: "Summary",
          description: "clear sky",
          icon: "01n",
          title: "Clear",
        },
        temperature: {
          __typename: "Temperature",
          actual: 274.05,
          feelsLike: 271.67,
          max: 278.71,
          min: 271.15,
        },
        timestamp: 1617490622,
        wind: {
          __typename: "Wind",
          deg: 210,
          speed: 2.06,
        },
      },
    },
  },
}
