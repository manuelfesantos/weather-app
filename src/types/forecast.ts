export interface Forecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  rain: string;
  wind_speed_10m: string;
  apparent_temperature: string;
  relative_humidity_2m: string;
  precipitation: string;
  weather_code: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  rain: number[];
  wind_speed_10m: number[];
  apparent_temperature: number[];
  relative_humidity_2m: number[];
  precipitation: number[];
  weather_code: number[];
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weather_code: string;
}

export interface Daily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

export interface ForecastDetails {
  wind_speed_10m: {
    value: number;
    unit: string;
  };
  precipitation: {
    value: number;
    unit: string;
  };
  relative_humidity_2m: {
    value: number;
    unit: string;
  };
  apparent_temperature: {
    value: number;
    unit: string;
  };
  temperature_2m: {
    value: number;
    unit: string;
  };
  weather_code: {
    value: number;
    unit: string;
  };
}

export interface DailyForecast {
  day: string;
  dayName: string;
  date: string;
  minTemperature: number;
  maxTemperature: number;
  weatherIcon: string;
}

export interface HourlyForecast {
  temperature: number;
  weatherIcon: string;
  time: string;
}
