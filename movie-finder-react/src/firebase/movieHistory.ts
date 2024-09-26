import {doc , updateDoc , arrayUnion , getDoc , setDoc , arrayRemove} from 'firebase/firestore';
import {db} from "./FirebaseAuth";

/**
 * Adds a movie to the user's watched history.
 * @param {string} userId - The unique ID of the user.
 * @param {string} movieId - The ID of the movie to add.
 */

export const addMovieToHistory = async(userId : string , movieId : number) => {
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

export const removeFromHistory = async(userId : string , movieId : number) => {
    const userDocRef = doc(db , 'userHistory' , userId);

    try{
        await updateDoc(userDocRef , {
            watchedMovies : arrayRemove(movieId)
        });
    } catch (error){
        console.log('Error Removing From History : ' , error);
    }
}

export const getMovieHistory = async (userId : string) => {
    const userDocRef = doc(db , 'userHistory' , userId);
    const userDoc = await getDoc(userDocRef);

    if(userDoc.exists()){
        return userDoc.data().watchedMovies;
    }else{
        return [];
    }
}