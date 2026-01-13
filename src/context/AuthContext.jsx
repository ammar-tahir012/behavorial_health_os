import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Spin } from 'antd';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = (email, password) => {
        return supabase.auth.signInWithPassword({ email, password });
    };

    const signup = (email, password, metadata) => {
        return supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            }
        });
    };

    const logout = () => {
        return supabase.auth.signOut();
    };

    // HIPAA Audit Helper
    const logAudit = async (action, details = {}) => {
        // Option A: Call Edge Function (Preferred for security)
        // await supabase.functions.invoke('log-hipaa-ack', { ... }) 

        // Option B: Direct Insert (if RLS allows or strictly for non-critical logs)
        // For compliance, we usually want server-side timestamps. 
        // Here we just wrap the call for the frontend to use.
        try {
            await supabase.from('audit_logs').insert([{
                action,
                details,
                user_id: user?.id
            }]);
        } catch (e) {
            console.error("Audit Log Failed:", e);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, logAudit, loading }}>
            {!loading ? children : <div className="h-screen flex items-center justify-center"><Spin size="large" /></div>}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
