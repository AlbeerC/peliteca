import { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase/config'
import { doc, setDoc, getDoc } from "firebase/firestore"
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, signOut } from 'firebase/auth'
import * as SecureStore from 'expo-secure-store'

const AuthContext = createContext()

function AuthProvider ( {children} ) {
    const [isLogged, setIsLogged] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getUserFromSecureStore().then(storedUser => {
                    if (storedUser) {
                        setUser(storedUser)
                    } else {
                        setUser(user)
                    }
                })
            } else {
                setUser(null)
            }
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
    const register = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            setIsLogged(true)
            setError(null)
            saveUserInSecureStore(user, username)
            saveUserToFirestore(user, username)
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
        } catch (error) {
            setError(`Error al ingresar usuario: ${error.message}`)
        }
    }

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithRedirect(auth, provider)

            if (getUser()) {
                setIsLogged(true)
                setError(null)
                saveUserInSecureStore(auth.currentUser)
                const username = auth.currentUser.displayName || 'GoogleUser'
                saveUserToFirestore(auth.currentUser, username)
            }
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

    const getUser = async () => { 
        const currentUser = auth.currentUser
        if (!currentUser) {
            return null
        }
    
        try {
            // Si el usuario tiene un displayName (por ejemplo, con Google), lo retornamos directamente
            if (currentUser.displayName) {
                return {
                    email: currentUser.email,
                    displayName: currentUser.displayName // Nombre de Google
                }
            }
    
            // Si no hay displayName, buscamos el username en Firestore
            const userDocRef = doc(db, "users", currentUser.uid)
            const userDoc = await getDoc(userDocRef)
    
            if (userDoc.exists()) {
                // Retornamos el email y el username desde Firestore
                return {
                    email: currentUser.email,
                    username: userDoc.data().username
                }
            } else {
                console.error("No user data found in Firestore")
                return currentUser
            }
        } catch (error) {
            console.error("Error fetching user data from Firestore:", error)
            return currentUser
        }
    }    

    const getUserId = () => {
        const user = getUser()
        return user ? user.uid : null
    }

    const saveUserInSecureStore = async (user, username) => {
        try {
            const userData = {...user, username}
            await SecureStore.setItemAsync('user', JSON.stringify(userData))
        } catch (error) {
            setError("Error saving user in secureStore:", error)
        }
    }

    const getUserFromSecureStore = async () => {
        try {
            const storedUser = await SecureStore.getItemAsync('user')
            return storedUser ? JSON.parse(storedUser) : null
        } catch (error) {
            setError("Error getting user from secureStore:", error)
            return null
        }
    }

    const removeUserFromSecureStore = async () => {
        try {
            await SecureStore.deleteItemAsync('user')
        } catch (error) {
            setError("Error removing user from secureStore:", error)
        }
    }

    const saveUserToFirestore = async (user, username) => {
        try {
            const userId = getUserId()
            const userRef = doc(db, "users", userId)

            if (typeof user.email !== 'string' || typeof username !== 'string') {
                throw new Error('Invalid data types for email or username')
            }

            await setDoc(userRef, {
                email: user.email,
                username
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