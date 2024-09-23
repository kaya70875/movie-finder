import { createContext , useContext, useEffect, useState } from "react";
import {auth} from '../firebase/FirebaseAuth';
import {createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut} from 'firebase/auth';

interface ContextType {
    currentUser : any;
    signUp : (email : string , password : string) => void;
    logIn : (email : string , password : string) => void;
    logOut : () => void;
}

const AuthContext = createContext<ContextType | null>(null);

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){

    const [currentUser , setCurrentUser] = useState<any>(null);
    const [loading , setLoading] = useState(true);

    function signUp(email : string , password : string){
        return createUserWithEmailAndPassword(auth , email , password);
    }

    function logIn(email : string , password : string){
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