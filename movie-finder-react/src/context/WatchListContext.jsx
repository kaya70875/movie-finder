import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/FirebaseAuth";
import {addMovieToHistory , removeFromHistory , getMovieHistory} from '../firebase/movieHistory';

export const WatchListContext = createContext();

export function useWatchList() {
  return useContext(WatchListContext);
}


export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const user = auth.currentUser;

  const loadWatchList = async () => {
    if (user) {
      const movies = await getMovieHistory(user.uid);
      setWatchList(movies);
    }

  };

  const addMovie = async (movieId) => {
    if (user) {
      await addMovieToHistory(user.uid, movieId);
      setWatchList((prevWatchList) => [...prevWatchList, movieId]);
    }
  };

  const deleteMovie = async (movieId) => {
    if (user) {
      await removeFromHistory(user.uid, movieId);
      setWatchList((prevWatchList) => prevWatchList.filter((id) => id !== movieId));
    }
  };

  useEffect(() => {
    loadWatchList();
  }, [user]);

  return (
    <WatchListContext.Provider
      value={{
        watchList,
        addMovie,
        deleteMovie,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
}