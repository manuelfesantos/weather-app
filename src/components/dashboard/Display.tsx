import "./Display.css";
import * as React from "react";
import { useLocationContext } from "../../contexts/LocationContext.tsx";
import { useForecastContext } from "../../contexts/ForecastContext.tsx";
import { useMemo } from "react";
import { getCurrentDateString } from "../../utils/date.ts";
import { getWeatherIcon } from "../../utils/forecast.ts";
export const Display: React.FC = () => {
  const { location } = useLocationContext();
  const { forecastDetails } = useForecastContext();
  const { date, icon } = useMemo(
    () => ({
      date: getCurrentDateString(),
      icon: getWeatherIcon(forecastDetails?.weather_code?.value),
    }),
    [forecastDetails],
  );
  if (!location || !forecastDetails) return null;
  return (
    <div className="Display">
      <div className="Display-location-time">
        <h3 className="Display-location">
          {location.city}, {location.country}
        </h3>
        <span className="Display-time">{date}</span>
      </div>
      <div className="Display-forecast">
        {icon && (
          <img
            src={`/images/icon-${icon}.webp`}
            alt={`${icon} icon`}
            width={100}
            height={100}
          />
        )}
        <span className="Display-temperature">
          {forecastDetails.temperature_2m.value}º
        </span>
      </div>
    </div>
  );
};
