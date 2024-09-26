import { doc, updateDoc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./FirebaseAuth";

interface UserStats {
  mostWatchedGenres: string[];
  movieCount: number;
  averageRating: number;
}

export const addStatsToHistory = async (
  userId : string,
  movieGenre : string[],
  movieCount : number,
  movieRating : number,
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

export const removeStatsFromHistory = async (userId: string) => {
  try {
    const userDocRef = doc(db, "userStats", userId);
    await deleteDoc(userDocRef);
    console.log("Stats successfully removed from Firestore.");
  } catch (error) {
    console.error("Error removing stats from Firestore:", error);
  }
};

export const getStatsFromHistory = async (userId: string) => {
  try {
    const userDocRef = doc(db, "userStats", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userStats: UserStats = userDoc.data().movieStats; // Comes from FireStore
      console.log("Successfully got stats:", userStats);
      console.log(userStats.mostWatchedGenres);
      const mostWatchedGenresObject = Object.entries(userStats.mostWatchedGenres);
      const mostWatchedGenresArray = mostWatchedGenresObject.reduce(
        (acc , [genre, count]) => {
          acc[genre] = (acc[genre] || 0) + count;
          return acc;
        },
        [] as {genre : string , count : number}[]
      );

      console.log("Most Watched Genres:", mostWatchedGenresArray);

      const sortedGenres = Object.entries(mostWatchedGenresArray)
        .map(([genre, count]) => ({ genre, count }))
        .sort((a, b) => Number(b.count) - Number(a.count))
        .slice(0, 2); // Get top 2 genres
      console.log("Sorted Genres:", sortedGenres);
      return [
        { label: "Most Watched Genres", value: sortedGenres },
        { label: "Movie Count", value: userStats.movieCount },
        { label: "Average Rating", value: userStats.averageRating },
      ];
    } else {
      console.log("No stats found for user.");
      return [];
    }
  } catch (error) {
    console.error("Error getting stats from Firestore:", error);
    return [];
  }
};
