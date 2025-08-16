import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const gooleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, gooleProvider)
    }

    const updateUserProfile = (displayName, photoURL) => {
        updateProfile(auth.currentUser, {displayName, photoURL})
        .then(() => {
            toast.success('Successfully updated!')
            setUser({...user, displayName, photoURL})
        })
        .catch(err => {
            toast.error(err.message)
            console.log(err)
        })
    }


    const logout = () => {
        setIsLoading(true)
        signOut(auth)
    }


    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
            setIsLoading(false)
        })

        return () => unSubscribe() // cleanup function
    }, [])


    const userInfo = {
        user,
        createUser,
        loginWithEmailAndPassword,
        signInWithGoogle,
        updateUserProfile,
        logout,
        isLoading,

    }

    return <AuthContext value={userInfo}>{children}</AuthContext>
};

export default AuthProvider;