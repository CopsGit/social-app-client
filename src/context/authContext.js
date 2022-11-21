import { createContext, useEffect, useState } from "react";
import api from "../helpers/axiosSetting";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const fetchUserInfo = async () => {
            try{
                const res = await api.get('/user/getInfo',{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setCurrentUser(res.data.info)
            } catch (e) {
                console.log(e)
                setCurrentUser(null)
                localStorage.removeItem('accessToken')
            }
        }
        // return () => {
            fetchUserInfo().then()
        // };
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};
