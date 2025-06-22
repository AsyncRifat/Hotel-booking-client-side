import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from '../firebase/firebase.init';


const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // updated user's profile
  const updateUser = ({ displayName, photoURL }) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  // google login
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // login user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // signOut user
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // reset password by email
  const forgotPassword = email => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = {
    createUser,
    googleSignIn,
    updateUser,
    signInUser,
    user,
    setUser,
    loading,
    signOutUser,
    forgotPassword,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
