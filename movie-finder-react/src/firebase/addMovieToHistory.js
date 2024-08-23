import {doc , updateDoc , arrayUnion , getDoc , setDoc} from 'firebase/firestore';
import {db} from "./FirebaseAuth";

/**
 * Adds a movie to the user's watched history.
 * @param {string} userId - The unique ID of the user.
 * @param {string} movieId - The ID of the movie to add.
 */

const addMovieToHistory = async(userId , movieId) => {
    const userDocRef = doc(db , "userHistory" , userId);

    const userDoc = await getDoc(userDocRef);
    if(!userDoc.exists()){
        await setDoc(userDocRef , {watchedMovies : [movieId]});
    }else{
        await updateDoc(userDocRef , {
            watchedMovies : arrayUnion(movieId)
        })
    }
}

export default addMovieToHistory;