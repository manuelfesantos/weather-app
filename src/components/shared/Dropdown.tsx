import "./Dropdown.css";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce.tsx";

interface DropdownProps<T> {
  headerContent: string | ReactNode;
  highlight?: boolean;
  multiple?: boolean;
  optionGroups: Omit<DropdownOptionGroupProps<T>, "closeDropdown">[];
}

export function Dropdown<T>({
  headerContent,
  optionGroups,
  highlight,
}: DropdownProps<T>) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleOutsideClick = useDebounce((event: MouseEvent) => {
    const target = event.target as Node;
    if (!dropdownRef.current) return;
    if (!dropdownRef.current.contains(target)) {
      setShowDropdown(false);
    }
  }, 500);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, [handleOutsideClick]);

  return (
    <div className="Dropdown" ref={dropdownRef}>
      <div
        className={`Dropdown-header ${highlight ? "highlight" : ""}`}
        onClick={toggleDropdown}
      >
        <img
          className={`Dropdown-icon ${showDropdown ? "active" : ""}`}
          src="/images/icon-dropdown.svg"
          alt="Dropdown icon"
          width={20}
          height={20}
        />
        {headerContent}
      </div>
      {showDropdown && (
        <div className="Dropdown-options">
          {optionGroups.map((optionGroup, index) => (
            <>
              <DropdownOptionGroup
                key={index}
                options={optionGroup.options}
                onChange={optionGroup.onChange}
                defaultOption={optionGroup.defaultOption}
                checkIcon={optionGroup.checkIcon}
                title={optionGroup.title}
                closeDropdown={() => {
                  if (optionGroups.length === 1) setShowDropdown(false);
                }}
              />
              {index < optionGroups.length - 1 && (
                <span className="Dropdown-options-separator"></span>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}

interface DropdownOptionGroupProps<T> {
  options: { name: string; value: T }[];
  defaultOption?: T;
  onChange: (option: T) => void;
  checkIcon?: boolean;
  closeDropdown: () => void;
  title?: string;
}

function DropdownOptionGroup<T>({
  options,
  defaultOption,
  onChange,
  checkIcon,
  closeDropdown,
  title,
}: DropdownOptionGroupProps<T>) {
  const [activeOption, setActiveOption] = useState<T | null>(
    defaultOption ?? null,
  );
  const switchOption = (option: T) => {
    setActiveOption(option);
    closeDropdown();
    onChange(option);
  };

  return (
    <>
      {title && <span className="Dropdown-options-title">{title}</span>}
      <div className="Dropdown-options-wrapper">
        {options.map((option, index) => (
          <DropdownOption
            key={index}
            checkIcon={checkIcon}
            name={option.name}
            value={option.value}
            isActive={activeOption === option.value}
            onClick={switchOption}
          />
        ))}
      </div>
    </>
  );
}

interface DropdownOptionProps<T> {
  checkIcon?: boolean;
  name: string;
  value: T;
  isActive: boolean;
  onClick: (value: T) => void;
}

function DropdownOption<T>({
  checkIcon,
  name,
  value,
  isActive,
  onClick,
}: DropdownOptionProps<T>) {
  return (
    <div
      className={`Dropdown-option ${isActive ? "active" : ""}`}
      onClick={() => onClick(value)}
    >
      <span>{name}</span>
      {checkIcon && isActive && (
        <img
          src="/images/icon-checkmark.svg"
          alt="checkmark icon"
          width={20}
          height={20}
        />
      )}
    </div>
  );
}
