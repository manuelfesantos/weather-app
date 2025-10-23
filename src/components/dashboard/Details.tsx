import "./Details.css";
import * as React from "react";
import { useForecastContext } from "../../contexts/ForecastContext.tsx";

export const Details: React.FC = () => {
  const { forecastDetails } = useForecastContext();
  if (!forecastDetails) return null;
  return (
    <div className="Details">
      <DetailsMetric
        title="Feels Like"
        value={forecastDetails.apparent_temperature.value}
        unit={forecastDetails.apparent_temperature.unit}
      />
      <DetailsMetric
        title="Humidity"
        value={forecastDetails.relative_humidity_2m.value}
        unit={forecastDetails.relative_humidity_2m.unit}
      />
      <DetailsMetric
        title="Wind"
        value={forecastDetails.wind_speed_10m.value}
        unit={forecastDetails.wind_speed_10m.unit}
      />
      <DetailsMetric
        title="Precipitation"
        value={forecastDetails.precipitation.value}
        unit={forecastDetails.precipitation.unit}
      />
    </div>
  );
};

const DetailsMetric: React.FC<{
  title: string;
  value: number;
  unit: string;
}> = ({ title, value, unit }) => {
  return (
    <div className="Details-metric">
      <span className="Details-metric-title">{title}</span>
      <span className="Details-metric-value">
        {value}
        {unit}
      </span>
    </div>
  );
};
