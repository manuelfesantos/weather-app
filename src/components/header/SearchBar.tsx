import "./SearchBar.css";
import { type ChangeEvent, useState } from "react";
import { geocodingApi } from "../../services/geocoding-api.ts";
import type { LocationData } from "../../types/location.ts";
import * as React from "react";
import { useDebounce } from "../../hooks/useDebounce.tsx";
import { useForecastContext } from "../../contexts/ForecastContext.tsx";
import { useLocationContext } from "../../contexts/LocationContext.tsx";
import { useUnitsContext } from "../../contexts/UnitsContext.tsx";

export const SearchBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);

  const updateSearchResults = useDebounce(async (text: string) => {
    setSearchResults(await geocodingApi.getLocationResults(text));
  }, 300);

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const text: string = event.target.value;
    if (!text) {
      setSearch("");
      setSearchResults([]);
      return;
    }
    setSearch(text);
    if (text.length <= 2) {
      setSearchResults([]);
    } else {
      updateSearchResults(text);
    }
  };

  const clearResults = () => {
    setSearchResults([]);
    setSearch("");
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-input-wrapper">
        <input
          type="text"
          placeholder="Search for a place..."
          className="SearchBar-input"
          value={search}
          onChange={handleSearch}
        />
        <ResultsDropdown clearResults={clearResults} results={searchResults} />
      </div>
      <button type="button" className="SearchBar-button">
        Search
      </button>
    </div>
  );
};

const ResultsDropdown: React.FC<{
  results: LocationData[];
  clearResults: () => void;
}> = ({ results, clearResults }) => {
  const { updateForecast } = useForecastContext();
  const { updateLocation } = useLocationContext();
  const { units } = useUnitsContext();

  const selectResult = (result: LocationData) => {
    updateForecast(result, units);
    updateLocation(result);
    clearResults();
  };

  if (!results.length) return null;

  return (
    <div className="SearchBar-results">
      {results.map((result, index) => (
        <div
          key={index}
          className="SearchBar-results-row"
          onClick={() => selectResult(result)}
        >
          <span className="">{result.city}</span>
          <span>{result.country}</span>
        </div>
      ))}
    </div>
  );
};
