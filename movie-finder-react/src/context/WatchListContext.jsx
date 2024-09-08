import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/FirebaseAuth";
import { addMovieToHistory, removeFromHistory, getMovieHistory } from "../firebase/movieHistory";

export const WatchListContext = createContext();

export function useWatchList() {
  return useContext(WatchListContext);
}

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const user = auth.currentUser;

  const [buttonLabels, setButtonLabels] = useState({});

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

      setButtonLabels((prev) => ({
        ...prev,
        [movieId]: {
          bigButton: 'Remove from Watch List',
          ellipseButton: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        
        }
      }));
    }
  };
  console.log('movie added' , watchList);

  const deleteMovie = async (movieId) => {
    if (user) {
      await removeFromHistory(user.uid, movieId);
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
  console.log('movie removed' , watchList);
  useEffect(() => {
    loadWatchList();
  }, [user]);

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
