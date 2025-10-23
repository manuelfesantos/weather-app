import type {
  DailyForecast,
  Forecast,
  ForecastDetails,
  HourlyForecast,
} from "../types/forecast.ts";
import { getWeekDayName } from "./date.ts";

export const getForecastDetails = (
  forecast: Forecast | null,
): ForecastDetails | null => {
  if (!forecast) {
    return null;
  }
  const hour = `${new Date().toISOString().split(":")[0]}:00`;
  const hourIndex = forecast.hourly.time.indexOf(hour);
  return {
    apparent_temperature: {
      value: forecast.hourly.apparent_temperature[hourIndex],
      unit: forecast.hourly_units.apparent_temperature,
    },
    relative_humidity_2m: {
      value: forecast.hourly.relative_humidity_2m[hourIndex],
      unit: forecast.hourly_units.relative_humidity_2m,
    },
    wind_speed_10m: {
      value: forecast.hourly.wind_speed_10m[hourIndex],
      unit: forecast.hourly_units.wind_speed_10m,
    },
    precipitation: {
      value: forecast.hourly.precipitation[hourIndex],
      unit: forecast.hourly_units.precipitation,
    },
    temperature_2m: {
      value: forecast.hourly.temperature_2m[hourIndex],
      unit: forecast.hourly_units.temperature_2m,
    },
    weather_code: {
      value: forecast.hourly.weather_code[hourIndex],
      unit: forecast.hourly_units.weather_code,
    },
  };
};

const weatherCodeToIconMap = {
  0: "sunny",
  1: "sunny",
  2: "partly-cloudy",
  3: "overcast",
  45: "fog",
  48: "fog",
  51: "drizzle",
  53: "drizzle",
  55: "drizzle",
  56: "drizzle",
  57: "drizzle",
  61: "rain",
  63: "rain",
  65: "rain",
  66: "rain",
  67: "rain",
  71: "snow",
  73: "snow",
  75: "snow",
  77: "snow",
  80: "rain",
  81: "rain",
  82: "rain",
  85: "rain",
  86: "rain",
  95: "storm",
  96: "storm",
  99: "storm",
};

export const getWeatherIcon = (weatherCode?: number): string => {
  if (weatherCode === undefined) return "";
  const weatherIcon = Object.entries(weatherCodeToIconMap).find(
    ([code]) => Number(code) === weatherCode,
  )?.[1];
  if (!weatherIcon) {
    throw new Error(`Invalid weather code: ${weatherCode}`);
  }
  return weatherIcon;
};

export const getDailyForecast = (
  forecast: Forecast | null,
): DailyForecast[] => {
  if (!forecast) return [];
  return forecast.daily.time.map((time, index) => {
    const day = new Date(time).toUTCString().substring(0, 3);
    return {
      day,
      dayName: getWeekDayName(day),
      date: new Date(time).toISOString().split("T")[0],
      minTemperature: forecast.daily.temperature_2m_min[index],
      maxTemperature: forecast.daily.temperature_2m_max[index],
      weatherIcon: getWeatherIcon(forecast.daily.weather_code[index]),
    };
  });
};

export const getHourlyForecastResults = (
  forecast: Forecast,
  date: string,
): HourlyForecast[] => {
  if (!date) return [];
  return forecast.hourly.time
    .map((time, index) => {
      if (time.startsWith(date)) {
        return {
          temperature: forecast.hourly.temperature_2m[index],
          weatherIcon: getWeatherIcon(forecast.hourly.weather_code[index]),
          time: getHourFromTime(time),
        };
      }
    })
    .filter((result) => !!result);
};

const getHourFromTime = (time: string): string => {
  const hour = time.split("T")[1].split(":")[0];
  if (!hour) {
    throw new Error("Invalid time");
  }
  const hourN = Number(hour);
  if (hourN === 0) return "12 PM";
  if (hourN === 12) return "12 AM";
  if (hourN < 12) return `${hourN} AM`;
  return `${hourN - 12} PM`;
};
