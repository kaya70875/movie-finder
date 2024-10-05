import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/FirebaseAuth";
import { addMovieToHistory, removeFromHistory, getMovieHistory } from "../firebase/movieHistory";
import { addStatsToHistory, removeStatsFromHistory } from "../firebase/UserStats";
import useStats from "../hooks/useStats";
import { useAuth } from "./AuthContext";

interface ContextType {
  watchList : number[];
  addMovie : (movieId : number) => void;
  deleteMovie : (movieId : number) => void;
  buttonLabels : {
    [key: number]: {
      bigButton: string;
      ellipseButton: string;
    };
  }
}

export const WatchListContext = createContext<ContextType | null>(null);

export function useWatchList() {
  return useContext(WatchListContext);
}

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState<number[]>([]);
  const  { currentUser } = useAuth()!;
  const [buttonLabels, setButtonLabels] = useState({});

  const stats = useStats(watchList);

  const loadWatchList = async () => {
    if (currentUser) {
      const movies = await getMovieHistory(currentUser.uid);
      setWatchList(movies);
    }
  };

  const addMovie = async (movieId : number) => {
    if (currentUser) {
      await addMovieToHistory(currentUser?.uid, movieId);
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

  const deleteMovie = async (movieId : number) => {
    if (currentUser) { 
      await removeFromHistory(currentUser?.uid, movieId);
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
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && watchList.length > 0) {
      addStatsToHistory(currentUser.uid, stats.mostWatchedGenresValue, watchList.length, stats.averageRatingValue);
    } else if(currentUser){
      removeStatsFromHistory(currentUser?.uid);
    }
  }, [watchList, currentUser, stats]);
  

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
