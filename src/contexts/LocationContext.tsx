import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import * as React from "react";
import type { LocationData } from "../types/location.ts";

interface LocationContextProps {
  location: LocationData | null;
  updateLocation: (location: LocationData) => void;
}

const LocationContext = createContext<LocationContextProps | null>(null);

export const LocationContextProvider: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  const [location, setLocation] = useState<LocationData | null>(null);

  const value = useMemo(
    () => ({
      location,
      updateLocation: setLocation,
    }),
    [location, setLocation],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = (): LocationContextProps => {
  const locationContext = useContext(LocationContext);
  if (!locationContext) {
    throw new Error("Using location context outside of its scope");
  }
  return locationContext;
};
