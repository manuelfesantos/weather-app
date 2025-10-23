export const TemperatureUnitEnum = {
  CELSIUS: "celsius",
  FAHRENHEIT: "fahrenheit",
} as const;

export type TemperatureUnit =
  (typeof TemperatureUnitEnum)[keyof typeof TemperatureUnitEnum];

export const WindSpeedUnitEnum = {
  KMH: "kmh",
  MS: "ms",
  MPH: "mph",
  NK: "kn",
} as const;

export type WindSpeedUnit =
  (typeof WindSpeedUnitEnum)[keyof typeof WindSpeedUnitEnum];

export const PrecipitationUnitEnum = {
  MM: "mm",
  INCH: "inch",
} as const;

export type PrecipitationUnit =
  (typeof PrecipitationUnitEnum)[keyof typeof PrecipitationUnitEnum];

export interface Units {
  temperature_unit: TemperatureUnit;
  wind_speed_unit: WindSpeedUnit;
  precipitation_unit: PrecipitationUnit;
}
