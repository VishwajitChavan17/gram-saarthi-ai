import React, { createContext, useContext, useState, useEffect } from 'react';
import StorageService from '../utils/StorageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const savedUser = StorageService.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Dummy authentication - in production, this would call a backend API
    const newUser = {
      id: Math.random().toString(36).substring(7),
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString()
    };
    
    StorageService.setUser(newUser);
    setUser(newUser);
    return newUser;
  };

  const signup = (email, password, name) => {
    // Dummy authentication - in production, this would call a backend API
    const newUser = {
      id: Math.random().toString(36).substring(7),
      email,
      name,
      createdAt: new Date().toISOString()
    };
    
    StorageService.setUser(newUser);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    StorageService.clearUser();
    StorageService.clearUserProfile();
    StorageService.clearEligibilityData();
    setUser(null);
  };

  const updateUserProfile = (profileData) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      StorageService.setUser(updatedUser);
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
