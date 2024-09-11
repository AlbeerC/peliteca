import { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase/config'
import { doc, setDoc } from "firebase/firestore"
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import * as SecureStore from 'expo-secure-store'

const AuthContext = createContext()

function AuthProvider ( {children} ) {
    const [isLogged, setIsLogged] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        const checkStoredUser = async () => {
            const storedUser = await getUserFromSecureStore()
            if (storedUser) {
                setIsLogged(true)
            }
        }
        checkStoredUser()
    }, [])

    // Log in and sing up functions  
    const register = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setIsLogged(true)
            setError(null)
            saveUserInSecureStore(auth.currentUser)
            saveUserToFirestore(auth.currentUser)
        } catch (error) {
            setError(`Error al registrar usuario: ${error.message}`)
        }
    }

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setIsLogged(true)
            setError(null)
            saveUserInSecureStore(auth.currentUser)
            saveUserToFirestore(auth.currentUser)
        } catch (error) {
            setError(`Error al ingresar usuario: ${error.message}`)
        }
    }

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            setIsLogged(true)
            setError(null)
            saveUserInSecureStore(auth.currentUser)
            saveUserToFirestore(auth.currentUser)
        } catch (error) {
            setError(`Error al ingresar con google: ${error.message}`)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            setIsLogged(false)
            setError(null)
            removeUserFromSecureStore()
        } catch (error) {
            setError(`Error al cerrar sesión: ${error.message}`)
        }
    }

    // Get user and SecureStore functions
    const getUser = () => {
        const currentUser = auth.currentUser
        if (currentUser) {
            return currentUser
        } else {
            return null
        }
    }

    const getUserId = () => {
        const user = getUser()
        return user ? user.uid : null
    }

    const saveUserInSecureStore = async (user) => {
        try {
            await SecureStore.setItemAsync('user', JSON.stringify(user))
        } catch (error) {
            setError("Error saving user in secureStore:", error)
        }
    }

    const getUserFromSecureStore = async () => {
        try {
            const storedUser = SecureStore.getItemAsync('user')
            return storedUser ? JSON.parse(storedUser) : null
        } catch (error) {
            setError("Error getting user from secureStore:", error)
        }
    }

    const removeUserFromSecureStore = async () => {
        try {
            await SecureStore.deleteItemAsync('user')
        } catch (error) {
            setError("Error removing user from secureStore:", error)
        }
    }

    const saveUserToFirestore = async (user) => {
        try {
            const userId = getUserId()
            const userRef = doc(db, "users", userId)

            await setDoc(userRef, {
                email: user.email
            })
        } catch (error) {
            console.error("Error saving user in Firestore:", error)
        }
    }

    return (
        <AuthContext.Provider value={{isLogged, error, register, login, loginWithGoogle, logout, getUser, getUserFromSecureStore, getUserId}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider