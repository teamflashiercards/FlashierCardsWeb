import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./SupabaseClient";

/*
    Description: This file is used to manage user authentication with Supabase.
    Last updated: 6/6/2026
*/

const AuthContext = createContext<any>(null);

export function AuthContextProvider({ children }: any) {
    const [session, setSession] = useState<any>(undefined);

    // handle user signup here
    const signup = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            return {success: false, error};
        } else {
            return {success: true, data};
        }
    };

    // handle email verification here
    const verifyToken = async (email: string, token: string) => {
        const { data, error } = await supabase.auth.verifyOtp({
            email: email,
            token: token,
            type: "email"
        });

        if (error) {
            return {success: false, error};
        } else {
            return {success: true, data};
        }
    };

    // handle user login here
    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            return {success: false, error};
        } else {
            return {success: true, data};
        }
    };

    // handle password reset here
    const resetPassword = async (email: string) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "http://localhost:5173/resetPassword",
        });

        if (error) {
            return {success: false, error};
        } else {
            return {success: true, data};
        }
    };

    // handle password update here
    const updatePassword = async (password: string) => {
        const { data, error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            return {success: false, error};
        } else {
            return {success: true, data};
        }
    };

    // handle logout here
    async function logout() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return {success: false, error};
        } else {
            return {success: true};
        }
    }

    // handle user session here
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);
    
    return (
        <AuthContext.Provider 
            value={{ signup, verifyToken, login, resetPassword, updatePassword, logout, session }}
        >
            { children }
        </AuthContext.Provider>
    );
};

export default function UserAuth() {
    return useContext(AuthContext);
};