import { ISetting } from "const";

export const getDataWeather = async (settings: ISetting) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${settings.city}&units=${settings.units}&appid=${settings.apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data fetch failed");
    const data = await response.json();
    const { main, weather, wind, sys } = data;
    return {
      temperature: Math.round(main.temp),
      feelsLike: Math.round(main.feels_like),
      tempMin: Math.round(main.temp_min),
      tempMax: Math.round(main.temp_max),
      humidity: main.humidity,
      windSpeed: Math.round(wind.speed),
      description: weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1),
      sunrise: new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sunset: new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  } catch (err) {
    console.log(err);
  }
};
