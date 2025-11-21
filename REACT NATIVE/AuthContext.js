import React, { createContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (token) => {
    try {
      setUserToken(token);
      await AsyncStorage.setItem('userToken', token);
    } catch (e) {
      console.warn('Error guardando token', e);
    }
  };

  const logout = async () => {
    try {
      setUserToken(null);
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      console.warn('Error removiendo token', e);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) setUserToken(token);
      } catch (e) {
        console.warn('Error leyendo token', e);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  const value = useMemo(() => ({ userToken, login, logout, loading }), [userToken, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
