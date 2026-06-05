import React , { useEffect, useState , useContext} from "react";
import {auth} from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";
import api from "@/services/axiosInstance";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser , setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        // const handleRedirectResult = async () => {
        // try {
        //     const result = await getRedirectResult(auth);
        //     if (result) {
        //         const user = result.user;
        //         const token=await user.getIdToken()
        //         setCurrentUser({ ...user,token });
        //     }
        // } catch (error) {
        //     console.error('Redirect sign-in error:', error);
        //     setLoading(false);
        // }
        // };

        // handleRedirectResult();
        return unsubscribe; 
    }, []);

    async function syncUserToBackend(user) {
        try {
            await api.post("users", {
                uid: user.uid,
                email: user.email,
                name: user.displayName || user.email?.split("@")[0],
                created_at: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error syncing user to backend:", error);
        }
    }

    async function initializeUser(user) {
        if(user){
            const token=await user.getIdToken();
            setCurrentUser({...user,token});
            setUserLoggedIn(true);
            await syncUserToBackend(user);
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value ={
        currentUser,
        userLoggedIn,
        loading
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}



