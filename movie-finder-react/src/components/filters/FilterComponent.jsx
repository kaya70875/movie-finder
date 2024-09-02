import React, { useState } from "react";
import DropdownFilter from "../reusables/DropdownFilter";
import ChevronIcon from "../reusables/ChevronIcon";
import { useFilter } from "../../context/FilterContext";
import SortBySection from "./SortBySection";

export default function FilterComponent() {
  const {
    sortState,
    isFilterOpen,
    genres,
    years,
    sortOptions,
    handleSelectedGenres,
    handleSelectedYear,
    handleSelectedSortBy,
    handleIcons,
  } = useFilter();

  return (
    <div className="all-dropdowns">
      <DropdownFilter
        label={
          <div className="discover-icons" onClick={() => handleIcons("genre")}>
            <p>Genre</p>
            <ChevronIcon isOpen={isFilterOpen.genre} />
          </div>
        }
        items={genres.map((genre) => ({ label: genre.name, value: genre.id }))}
        onSelect={handleSelectedGenres}
        selectedItems={sortState.selectedGenres}
      />

      <DropdownFilter
        label={
          <div className="discover-icons" onClick={() => handleIcons("year")}>
            <p>Release Date</p>
            <ChevronIcon isOpen={isFilterOpen.year} />
          </div>
        }
        items={years.map((year) => ({ label: year, value: year }))}
        onSelect={handleSelectedYear}
        selectedItems={[sortState.selectedYear]}
      />

      <div></div>

      <SortBySection
      items={sortOptions}
      onSelect={handleSelectedSortBy}
      selectedItems={sortState.selectedSortBy} 

      />
    </div>
  );
}
