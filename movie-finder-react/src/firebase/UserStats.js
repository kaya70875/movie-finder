import { doc, updateDoc, getDoc, setDoc , deleteDoc} from "firebase/firestore";
import { db } from "./FirebaseAuth";

export const addStatsToHistory = async (
  userId,
  movieGenre,
  movieCount,
  movieRating
) => {
  try {
    console.log("firebaseCount : ", movieCount);
    const userDocRef = doc(db, "userStats", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        movieStats: {
          mostWatchedGenres: movieGenre,
          movieCount: movieCount,
          averageRating: movieRating,
        },
      });
    } else {
      await updateDoc(userDocRef, {
        "movieStats.mostWatchedGenres": movieGenre,
        "movieStats.movieCount": movieCount,
        "movieStats.averageRating": movieRating,
      });
    }
    console.log("Stats successfully added to Firestore.");
  } catch (error) {
    console.error("Error adding stats to Firestore:", error);
  }
};

export const removeStatsFromHistory = async (userId) => {
  try {
    const userDocRef = doc(db, "userStats", userId);
    await deleteDoc(userDocRef);
    console.log("Stats successfully removed from Firestore.");
  } catch (error) {
    console.error("Error removing stats from Firestore:", error);
  }
};

export const getStatsFromHistory = async (userId) => {
    try {
      const userDocRef = doc(db, "userStats", userId);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userStats = userDoc.data().movieStats;
        console.log("Successfully got stats:", userStats);
  
        const mostWatchedGenresArray = Object.entries(userStats.mostWatchedGenres)
        .map(([genre, count]) => ({ genre, count }))
        .sort((a, b) => b.count - a.count) // Sort by count in descending order
        .filter((genreStat, index, array) => {
          return index === 0 || genreStat.count === array[0].count;
        })
        .sort((a, b) => a.genre.localeCompare(b.genre)) // Sort alphabetically by genre name
        .slice(0, 2); // Take the top 2 genres
  
        console.log("Successfully got most watched genres:", mostWatchedGenresArray);
        return [
          { label: "Most Watched Genres", value: mostWatchedGenresArray },
          { label: "Movie Count", value: userStats.movieCount },
          { label: "Average Rating", value: parseInt(userStats.averageRating) }
        ];
      } else {
        console.log('No stats found for user.');
        return [];
      }
    } catch (error) {
      console.error('Error getting stats from Firestore:', error);
      return [];
    }
  };
  
