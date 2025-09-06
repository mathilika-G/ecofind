import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from '../utils/helpers';

export const AuthContext = createContext();

const USERS_KEY = 'EF_USERS';
const SESSION_KEY = 'EF_SESSION';

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const rawUsers = await AsyncStorage.getItem(USERS_KEY);
      const curSession = await AsyncStorage.getItem(SESSION_KEY);
      if (rawUsers) setUsers(JSON.parse(rawUsers));
      if (curSession) setUser(JSON.parse(curSession));
    })();
  }, []);

  const persistUsers = async (arr) => {
    setUsers(arr);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(arr));
  };

  const signUp = async (email, password, username) => {
    if (!email || !password) return { success: false, message: 'Email & password required' };
    const exists = users.find((u) => u.email === email);
    if (exists) return { success: false, message: 'Email already registered' };
    const newUser = { id: generateId(), email, password, username };
    await persistUsers([...users, newUser]);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const signIn = async (email, password) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(found));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem(SESSION_KEY);
  };

  const updateProfile = async (data) => {
    if (!user) return;
    const updated = { ...user, ...data };
    const others = users.filter((u) => u.id !== user.id);
    await persistUsers([...others, updated]);
    setUser(updated);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ users, user, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
