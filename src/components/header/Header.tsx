import * as React from "react";
import "./Header.css";
import { SearchBar } from "./SearchBar.tsx";
import { UnitsDropdown } from "./UnitsDropdown.tsx";

export const Header: React.FC = () => {
  return (
    <header className="Header">
      <div className="Header-header">
        <img src="/images/logo.svg" alt="logo image" />
        <UnitsDropdown />
      </div>
      <div className="Header-center">
        <h1>How's the sky looking today?</h1>
        <SearchBar />
      </div>
    </header>
  );
};
