import * as React from "react";
import "./UnitsDropdown.css";
import { Dropdown } from "../shared/Dropdown.tsx";
import { useUnitsContext } from "../../contexts/UnitsContext.tsx";
import {
  type PrecipitationUnit,
  PrecipitationUnitEnum,
  type TemperatureUnit,
  TemperatureUnitEnum,
  type Units,
  type WindSpeedUnit,
  WindSpeedUnitEnum,
} from "../../types/units.ts";
import { useForecastContext } from "../../contexts/ForecastContext.tsx";
import { useLocationContext } from "../../contexts/LocationContext.tsx";

export const UnitsDropdown: React.FC = () => {
  const { units, updateUnits } = useUnitsContext();
  const { location } = useLocationContext();
  const { updateForecast } = useForecastContext();

  const handleOnChange = (unit: Partial<Units>) => {
    const newUnits = {
      ...units,
      ...unit,
    };
    updateUnits(newUnits);
    if (location) {
      updateForecast(location, newUnits);
    }
  };

  return (
    <Dropdown
      multiple
      headerContent={
        <span className="UnitsDropdown-label">
          <img src="/images/icon-units.svg" alt="Units icon" />
          <span className="UnitsDropdown-label">Units</span>
        </span>
      }
      optionGroups={[
        {
          title: "Temperature",
          options: [
            { name: "Celsius (ºC)", value: TemperatureUnitEnum.CELSIUS },
            { name: "Fahrenheit (ºF)", value: TemperatureUnitEnum.FAHRENHEIT },
          ],
          defaultOption: units["temperature_unit"],
          onChange: (unit) =>
            handleOnChange({ temperature_unit: unit as TemperatureUnit }),
          checkIcon: true,
        },
        {
          title: "Wind Speed",
          options: [
            {
              name: "km/h",
              value: WindSpeedUnitEnum.KMH,
            },
            { name: "m/s", value: WindSpeedUnitEnum.MS },
            { name: "mph", value: WindSpeedUnitEnum.MPH },
            { name: "kn", value: WindSpeedUnitEnum.NK },
          ],
          defaultOption: units["wind_speed_unit"],
          checkIcon: true,
          onChange: (unit) =>
            handleOnChange({ wind_speed_unit: unit as WindSpeedUnit }),
        },
        {
          title: "Precipitation",
          options: [
            {
              name: "mm",
              value: PrecipitationUnitEnum.MM,
            },
            { name: "inch", value: PrecipitationUnitEnum.INCH },
          ],
          defaultOption: units["precipitation_unit"],
          onChange: (unit) =>
            handleOnChange({ precipitation_unit: unit as PrecipitationUnit }),
          checkIcon: true,
        },
      ]}
    />
  );
};
