import { createContext , useContext, useEffect, useState } from "react";
import {auth} from '../firebase/FirebaseAuth';
import {createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){

    const [currentUser , setCurrentUser] = useState();
    const [loading , setLoading] = useState(true);

    function signUp(email , password){
        return createUserWithEmailAndPassword(auth , email , password);
    }

    function logIn(email , password){
        return signInWithEmailAndPassword(auth , email , password);
    }

    function logOut(){
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    } , [])

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )    
}