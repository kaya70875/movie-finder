import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/FirebaseAuth";
import { addMovieToHistory, removeFromHistory, getMovieHistory } from "../firebase/movieHistory";
import { addStatsToHistory, removeStatsFromHistory } from "../firebase/UserStats";
import useStats from "../hooks/useStats";

export const WatchListContext = createContext();

export function useWatchList() {
  return useContext(WatchListContext);
}

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const user = auth.currentUser;
  const [buttonLabels, setButtonLabels] = useState({});

  const stats = useStats(watchList);

  const loadWatchList = async () => {
    if (user) {
      const movies = await getMovieHistory(user.uid);
      setWatchList(movies);
    }
  };

  const addMovie = async (movieId) => {
    if (user) {
      await addMovieToHistory(user?.uid, movieId);
      setWatchList((prevWatchList) => [...prevWatchList, movieId]);

      setButtonLabels((prev) => ({
        ...prev,
        [movieId]: {
          bigButton: 'Remove from Watch List',
          ellipseButton: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#F8312F" stroke="#F8312F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        
        }
      }));
    }
  };

  const deleteMovie = async (movieId) => {
    if (user) { 
      await removeFromHistory(user?.uid, movieId);
      setWatchList((prevWatchList) =>
        prevWatchList.filter((id) => id !== movieId)
      );


      setButtonLabels((prev) => ({
        ...prev,
        [movieId]: {
          bigButton: 'Add to Watch List',
          ellipseButton: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>        
        }
      }));
    }
  };

  useEffect(() => {
    loadWatchList();
  }, [user]);

  useEffect(() => {
    if (user && watchList.length > 0) {
      addStatsToHistory(user.uid, stats.mostWatchedGenresValue, watchList.length, stats.averageRatingValue);
    } else{
      removeStatsFromHistory(user?.uid);
    }
  }, [watchList, user, stats]);
  

  return (
    <WatchListContext.Provider
      value={{
        watchList,
        addMovie,
        deleteMovie,
        buttonLabels,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
