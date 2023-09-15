export type WeatherData = {
  city: {
    name: string
  }
  list: {
    main: {
      temp: number
      humidity: number
    }
    weather: {
      id: number;
    }[];
    wind: {
      speed: number
    }
    dt: number
  }[]
}
