import {createContext, useState, useEffect} from 'react';

import { onAuthStateChangedListner, createUserDocumentFromAuth } from '../utils/firebase/firebase';
export const UserContext = createContext({
    CurrentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({children}) =>{
    const [CurrentUser,setCurrentUser] = useState(null)
    const value = {CurrentUser,setCurrentUser}

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListner((user)=>{
            if (user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe
    },[])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}