import {getDoc , doc} from "firebase/firestore";
import {db} from "./FirebaseAuth";

/**
 * Retrieves the user's watched movie history.
 * @param {string} userId - The unique ID of the user.
 * @returns {Array} - An array of watched movie IDs.
 */

const getMovieHistory = async (userId) => {
    const userDocRef = doc(db , 'userHistory' , userId);
    const userDoc = await getDoc(userDocRef);

    if(userDoc.exists()){
        return userDoc.data().watchedMovies;
    }else{
        return [];
    }
}

export default getMovieHistory;