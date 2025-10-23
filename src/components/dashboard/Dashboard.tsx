import * as React from "react";
import "./Dashboard.css";
import { Display } from "./Display.tsx";
import { HourlyForecastWrapper } from "./HourlyForecast.tsx";
import { Details } from "./Details.tsx";
import { DailyForecast } from "./DailyForecast.tsx";

export const Dashboard: React.FC = () => {
  return (
    <div className="Dashboard">
      <Display />
      <Details />
      <DailyForecast />
      <HourlyForecastWrapper />
    </div>
  );
};
