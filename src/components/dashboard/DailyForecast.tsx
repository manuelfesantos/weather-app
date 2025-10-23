import "./DailyForecast.css";
import * as React from "react";
import { useForecastContext } from "../../contexts/ForecastContext.tsx";

export const DailyForecast: React.FC = () => {
  const { dailyForecast } = useForecastContext();
  if (!dailyForecast.length) return null;
  return (
    <div className="DailyForecast">
      <h3 className="DailyForecast-title">Daily forecast</h3>
      <div className="DailyForecast-metrics">
        {dailyForecast.map((forecast, index) => (
          <div className="DailyForecast-metric" key={index}>
            <span className="DailyForecast-metric-title">{forecast.day}</span>
            <img
              className="DailyForecast-icon"
              src={`/images/icon-${forecast.weatherIcon}.webp`}
              alt={`${forecast.weatherIcon} icon`}
            />
            <div className="DailyForecast-metric-temps">
              <span className="DailyForecast-metric-temp">
                {forecast.minTemperature}º
              </span>
              <span className="DailyForecast-metric-temp">
                {forecast.maxTemperature}º
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
