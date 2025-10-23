import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import * as React from "react";
import { weatherApi } from "../services/weather-api.ts";
import type { LocationData } from "../types/location.ts";
import type {
  DailyForecast,
  Forecast,
  ForecastDetails,
} from "../types/forecast.ts";
import { getDailyForecast, getForecastDetails } from "../utils/forecast.ts";
import type { Units } from "../types/units.ts";

interface ForecastContextProps {
  forecast: Forecast | null;
  updateForecast: (location: LocationData, units: Units) => void;
  forecastDetails: ForecastDetails | null;
  dailyForecast: DailyForecast[];
}

const ForecastContext = createContext<ForecastContextProps | null>(null);

export const ForecastContextProvider: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const value = useMemo(
    () => ({
      forecast,
      updateForecast: async (location: LocationData, units: Units) => {
        setForecast(await weatherApi.getForecast(location, units));
      },
      forecastDetails: getForecastDetails(forecast),
      dailyForecast: getDailyForecast(forecast),
    }),
    [forecast, setForecast],
  );
  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
};

export const useForecastContext = () => {
  const forecastContext = useContext(ForecastContext);
  if (!forecastContext) {
    throw new Error("Using forecast context outside of its scope");
  }
  return forecastContext;
};
