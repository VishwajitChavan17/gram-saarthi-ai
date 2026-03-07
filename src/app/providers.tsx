'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StorageService } from '@/lib/storage';

export interface User {
  id: string;
  email: string;
  name: string;
  age?: string;
  occupation?: string;
  incomeRange?: string;
  state?: string;
  category?: string;
  language?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id'>, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<User>) => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode: 'login' | 'signup') => void;
  closeAuthModal: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = StorageService.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password: string) => {
    // Dummy auth - in production, call your backend
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
    };

    setUser(newUser);
    StorageService.setUser(newUser);
  };

  const signup = async (userData: Omit<User, 'id'>, password: string) => {
    // Dummy auth - in production, call your backend
    if (!userData.email || !password || !userData.name) {
      throw new Error('Name, Email and Password are required');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
    };

    setUser(newUser);
    StorageService.setUser(newUser);
    // Also save profile separately if needed
    StorageService.setUserProfile(userData);
  };

  const logout = () => {
    setUser(null);
    StorageService.clearUser();
  };

  const updateProfile = (profile: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...profile };
      setUser(updatedUser);
      StorageService.setUser(updatedUser);
      StorageService.setUserProfile(profile);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout, 
      updateProfile,
      isAuthModalOpen,
      authModalMode,
      openAuthModal,
      closeAuthModal
    }}>
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
