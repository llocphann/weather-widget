export const DEFAULT_SETTING = {
  apiKey: "",
  city: "None",
  units: "metric",
  fontSize: "1em",
  fontColor: "#fff",
  backgroundColor: "#0A1519z",
  temperatureColor: "#fff",
  feelsLikeColor: "#fff",
  minMaxColor: "#fff",
  humidityColor: "#fff",
  windColor: "#fff",
  sunriseSunsetColor: "#fff",
  showTemperature: true,
  showFeelsLike: true,
  showMinMax: true,
  showHumidity: true,
  showWind: true,
  showSunriseSunset: true,
  feelsLikeAlignment: "center",
  minMaxAlignment: "center",
  humidityAlignment: "center",
  windAlignment: "center",
  sunriseSunsetAlignment: "center",
  fontFamily: "Arial",
};

export interface ISetting {
  apiKey: string;
  city: string;
  units: string;
  fontSize: string;
  fontColor: string;
  backgroundColor: string;
  temperatureColor: string;
  feelsLikeColor: string;
  minMaxColor: string;
  humidityColor: string;
  sunriseSunsetColor: string;
  windColor: string;
  showTemperature: boolean;
  showFeelsLike: boolean;
  showMinMax: boolean;
  showHumidity: boolean;
  showWind: boolean;
  showSunriseSunset: boolean;
  feelsLikeAlignment: string;
  minMaxAlignment: string;
  humidityAlignment: string;
  windAlignment: string;
  sunriseSunsetAlignment: string;
  fontFamily: string;
  [key: string]: any;
}
