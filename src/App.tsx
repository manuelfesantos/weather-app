import * as React from "react";
import "./App.css";
import { Header } from "./components/header/Header.tsx";
import { Dashboard } from "./components/dashboard/Dashboard.tsx";
import { ForecastContextProvider } from "./contexts/ForecastContext.tsx";
import { LocationContextProvider } from "./contexts/LocationContext.tsx";
import { UnitsContextProvider } from "./contexts/UnitsContext.tsx";

export const App: React.FC = () => {
  return (
    <div className="App">
      <UnitsContextProvider>
        <LocationContextProvider>
          <ForecastContextProvider>
            <Header />
            <Dashboard />
          </ForecastContextProvider>
        </LocationContextProvider>
      </UnitsContextProvider>
    </div>
  );
};
