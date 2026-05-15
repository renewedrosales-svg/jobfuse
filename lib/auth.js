"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./firebase";

/**
 * SIGN UP EMPLOYER
 */
export async function signupEmployer({
  companyName,
  email,
  password,
}) {

  // Persist auth session
  await setPersistence(
    auth,
    browserLocalPersistence
  );

  // Create Firebase account
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  console.log(
    "USER CREATED:",
    user.email
  );

  // Send verification email
  await sendEmailVerification(user);

  console.log(
    "VERIFICATION EMAIL SENT"
  );

  // Save employer in Firestore
  await setDoc(doc(db, "users", user.uid), {
    userId: user.uid,
    email: user.email,
    companyName: companyName || "",
    createdAt: serverTimestamp(),
    emailVerified: false,
  });

  return user;
}

/**
 * SIGN IN EMPLOYER
 */
export async function signinEmployer({
  email,
  password,
}) {

  // Persist auth session
  await setPersistence(
    auth,
    browserLocalPersistence
  );

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return userCredential.user;
}

/**
 * LOGOUT EMPLOYER
 */
export async function logoutEmployer() {
  await signOut(auth);
}