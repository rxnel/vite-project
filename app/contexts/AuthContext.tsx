import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import supabase from '../utils/supabase';
import type { User } from '@supabase/supabase-js';

type AuthContextType = {
	user: User | null;
	loading: boolean;
	signIn: (email: string) => Promise<{ error: any }>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		// Check active session when the component mounts
		const checkUser = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setUser(session?.user || null);
			setLoading(false);
		};

		checkUser();

		// Listen for authentication state changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user || null);
			setLoading(false);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const signIn = async (email: string) => {
		return await supabase.auth.signInWithOtp({ email });
	};

	const signOut = async () => {
		await supabase.auth.signOut();
		navigate('/auth');
	};

	return (
		<AuthContext.Provider value={{ user, loading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
