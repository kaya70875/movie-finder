import React, { useEffect } from "react";
import { useWatchList } from "../../context/WatchListContext";

export default function MovieButton({ id, watchedLabel, removeLabel, button }) {
  const { watchList, addMovie, deleteMovie } = useWatchList();

  const isInWatchList = watchList.includes(id);

  const handleWatch = (e) => {
    e.stopPropagation();

    if (isInWatchList) {
      deleteMovie(id);
      console.log('movie removed');
    } else {
      addMovie(id);
      console.log('movie added');
    }
  };

  // No need for local state, determine the label based on the watchList
  const buttonLabel = isInWatchList ? removeLabel : watchedLabel;

  return (
    <button className={button} onClick={handleWatch}>
      {buttonLabel}
    </button>
  );
}
