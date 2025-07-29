import { useState, useRef } from "react";
import { useSearchParams } from "react-router";

export const useFilterSearch = (initialSearchValue: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(initialSearchValue);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const updateSearchParams = (value: string) => {
    const params = {
      ...Object.fromEntries(searchParams),
    };
    if (value) {
      params.search = value;
    } else {
      delete params.search;
    }
    setSearchParams(params);
  };

  const handleChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
    isMobile: boolean,
  ) => {
    const value = e.currentTarget.value;
    setSearchInput(value);

    if (!isMobile) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        updateSearchParams(value);
      }, 500);
    }
  };

  const handleApplySearch = () => {
    updateSearchParams(searchInput);
  };

  return {
    searchInput,
    handleChangeSearch,
    handleApplySearch,
  };
};
