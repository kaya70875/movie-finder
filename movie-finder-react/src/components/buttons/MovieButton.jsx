import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/FirebaseAuth";
import {addMovieToHistory , removeFromHistory , getMovieHistory} from '../../firebase/movieHistory';

export default function MovieButton({id}) {

    const user = auth.currentUser;
    const [buttonLabel  , setButtonLabel] = useState('Add As Watched');

    const handleWatch = async() => {
      
        if(user){
          const watchedMovies = await getMovieHistory(user.uid);
  
          if(watchedMovies.includes(id)){
            await removeFromHistory(user.uid , id);
            setButtonLabel('Add As Watched');
            alert('Movie Removed From Your History!');
          }else{
            await addMovieToHistory(user.uid , id);
            setButtonLabel('Remove From History');
            alert('Movie Added to Your Watched List!');
          }
          
        }else{
          alert('Please log in to track your movies!');
        }
      }
  
      useEffect(() => {
        const setInitialButtonLabel = async () => {
          if (user) {
            const watchedMovies = await getMovieHistory(user.uid);
            if (watchedMovies.includes(id)) {
              setButtonLabel('Remove From History');
            } else {
              setButtonLabel('Add As Watched');
            }
          }
        };
    
        setInitialButtonLabel();
      }, [user, id]);
  return (
    <button className='secondary-button' onClick={handleWatch}>{buttonLabel}</button>
  )
}
