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
