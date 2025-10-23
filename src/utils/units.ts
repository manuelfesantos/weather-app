const unitValueToNameMap = {
  celsius: "Celsius (ºC)",
  fahrenheit: "Fahrenheit (ºF)",
  kmh: "km/h",
  ms: "m/s",
  mph: "mph",
  kn: "kn",
  mm: "mm",
  inch: "inch",
};

export const getUnitName = (
  unitValue: keyof typeof unitValueToNameMap,
): string => {
  return unitValueToNameMap[unitValue];
};
