import type { LocationData } from "../types/location.ts";
import { getQueryString } from "../utils/query-string.ts";
import type { Forecast } from "../types/forecast.ts";
import type { Units } from "../types/units.ts";

class WeatherApi {
  private baseUrl = "https://api.open-meteo.com/v1/forecast";

  async getForecast(location: LocationData, units: Units): Promise<Forecast> {
    const query = this.getQueryParams(
      location.latitude,
      location.longitude,
      units,
    );
    const url = `${this.baseUrl}${query}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather forecast ");
    }
    return await response.json();
  }

  private getQueryParams(latitude: number, longitude: number, units: Units) {
    const queryParams = {
      latitude: latitude.toFixed(2),
      longitude: longitude.toFixed(2),
      hourly:
        "temperature_2m,precipitation,wind_speed_10m,apparent_temperature,relative_humidity_2m,weather_code",
      daily: "temperature_2m_max,temperature_2m_min,weather_code",
      ...units,
    };
    return getQueryString(queryParams);
  }
}

export const weatherApi = new WeatherApi();
