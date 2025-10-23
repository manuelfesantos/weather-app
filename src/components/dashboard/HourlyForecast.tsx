import "./HourlyForecast.css";
import * as React from "react";
import { Dropdown } from "../shared/Dropdown.tsx";
import { useForecastContext } from "../../contexts/ForecastContext.tsx";
import { getWeekDayName } from "../../utils/date.ts";
import { useMemo, useState } from "react";
import type { DailyForecast, Forecast } from "../../types/forecast.ts";
import { getHourlyForecastResults } from "../../utils/forecast.ts";

export const HourlyForecastWrapper: React.FC = () => {
  const { dailyForecast, forecast } = useForecastContext();
  if (!forecast || !dailyForecast.length) return null;
  return <HourlyForecast dailyForecast={dailyForecast} forecast={forecast} />;
};

export const HourlyForecast: React.FC<{
  dailyForecast: DailyForecast[];
  forecast: Forecast;
}> = ({ dailyForecast, forecast }) => {
  const [currentDay, setCurrentDay] = useState(dailyForecast[0]);

  const results = useMemo(
    () => getHourlyForecastResults(forecast, currentDay.date),
    [forecast, currentDay],
  );

  return (
    <div className="HourlyForecast">
      <div className="HourlyForecast-header">
        <h3>Hourly forecast</h3>
        <Dropdown
          headerContent={currentDay.dayName}
          highlight
          optionGroups={[
            {
              options: dailyForecast.map((day) => ({
                name: getWeekDayName(day.day),
                value: day,
              })),
              defaultOption: currentDay,
              onChange: setCurrentDay,
            },
          ]}
        />
      </div>
      <div className="HourlyForecast-results">
        {results.map((result, index) => (
          <div className="HourlyForecast-result" key={index}>
            <div className="HourlyForecast-result-icon-and-time">
              <img
                src={`/images/icon-${result.weatherIcon}.webp`}
                alt={`${result.weatherIcon} icon`}
                height={40}
                width={40}
              />
              <span>{result.time}</span>
            </div>
            <span>{result.temperature}º</span>
          </div>
        ))}
      </div>
    </div>
  );
};
