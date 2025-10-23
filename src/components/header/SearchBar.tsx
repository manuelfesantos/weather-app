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
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const updateSearchResults = useDebounce(async (text: string) => {
    setLoading(true);
    const results = await geocodingApi.getLocationResults(text);
    console.log("results:", results);
    setNoResults(results.length === 0);
    setSearchResults(results);
    setLoading(false);
  }, 300);

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const text: string = event.target.value;
    if (!text) {
      setSearch("");
      setSearchResults([]);
      setNoResults(false);
      return;
    }
    setSearch(text);
    if (text.length <= 2) {
      setSearchResults([]);
      setNoResults(false);
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
        {loading && <Loading />}
        {!loading && (
          <ResultsDropdown
            clearResults={clearResults}
            results={searchResults}
            noResults={noResults}
          />
        )}
      </div>
      <button type="button" className="SearchBar-button">
        Search
      </button>
    </div>
  );
};

const Loading: React.FC = () => {
  return (
    <div className="SearchBar-results">
      <div className="SearchBar-results-row">
        <img
          className="SearchBar-loading-icon"
          src="/images/icon-loading.svg"
          alt="Loading icon"
        />
        <span>loading...</span>
      </div>
    </div>
  );
};

const ResultsDropdown: React.FC<{
  results: LocationData[];
  clearResults: () => void;
  noResults: boolean;
}> = ({ results, clearResults, noResults }) => {
  const { updateForecast } = useForecastContext();
  const { updateLocation } = useLocationContext();
  const { units } = useUnitsContext();

  const selectResult = (result: LocationData) => {
    updateForecast(result, units);
    updateLocation(result);
    clearResults();
  };

  if (!noResults && !results.length) return null;

  return (
    <div className="SearchBar-results">
      {noResults ? (
        <div className="SearchBar-results-row">
          <span>No search result found</span>
        </div>
      ) : (
        results.map((result, index) => (
          <div
            key={index}
            className="SearchBar-results-row"
            onClick={() => selectResult(result)}
          >
            <span className="">{result.city}</span>
            <span>{result.country}</span>
          </div>
        ))
      )}
    </div>
  );
};
