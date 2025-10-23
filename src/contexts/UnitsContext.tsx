import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import * as React from "react";
import type { Units } from "../types/units.ts";

interface UnitsContextProps {
  units: Units;
  updateUnits: (units: Partial<Units>) => void;
}

const UnitsContext = createContext<UnitsContextProps | null>(null);

const defaultUnits: Units = {
  precipitation_unit: "mm",
  temperature_unit: "celsius",
  wind_speed_unit: "kmh",
};

export const UnitsContextProvider: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  const [units, setUnits] = useState<Units>(defaultUnits);

  const value = useMemo(
    () => ({
      units,
      updateUnits: (units: Partial<Units>) =>
        setUnits((prevState) => ({ ...prevState, ...units })),
    }),
    [units, setUnits],
  );

  return (
    <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>
  );
};

export const useUnitsContext = (): UnitsContextProps => {
  const unitsContext = useContext(UnitsContext);
  if (!unitsContext) {
    throw new Error("Using units context outside of its scope");
  }
  return unitsContext;
};
