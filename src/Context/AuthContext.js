import { GoogleAuthProvider,onAuthStateChanged,signOut } from "firebase/auth";
import React, { useState, useContext, useEffect } from "react";
import { auth, signInWithPopup, provider } from "../firebase";
const AuthContext = React.createContext();
export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, isLoading]= useState();

    async function loginIn() {
        return (await signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);
                localStorage.setItem("email",user.email);
                localStorage.setItem("photoURL",user.photoURL)
                return user.email;
            }).catch((error) => {
                console.log(error.message);
            })
            );
    }

    async function SignOut(){
        return(
            await signOut(auth).then(()=>{
                window.location.href="/"
                localStorage.removeItem("email")
                localStorage.removeItem("photoURL")
                console.log("Sign Out Successful")
                console.log(currentUser)
            }).catch((error)=>{
                console.log(error.message);
            })
        )
    }
    onAuthStateChanged(auth, user => {
        setCurrentUser(user)
    })


    const value = {
        currentUser,
        loginIn,
        SignOut
    }
    return (
        <AuthContext.Provider value={value}>
            
            {children}
        </AuthContext.Provider>
    )
}