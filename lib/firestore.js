import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

/**
 * CREATE JOB
 */
export async function createJob(jobData) {

  const docRef = await addDoc(
    collection(db, "jobs"),
    {
      ...jobData,

      createdAt: serverTimestamp(),

      isActive: true,

      reportCount: 0,
    }
  );

  return docRef.id;
}

/**
 * GET ALL ACTIVE JOBS
 */
export async function getActiveJobs() {

  const q = query(
    collection(db, "jobs"),
    where("isActive", "==", true),
    orderBy("createdAt", "desc")
  );

  const querySnapshot =
    await getDocs(q);

  const jobs = [];

  querySnapshot.forEach((doc) => {

    jobs.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return jobs;
}

/**
 * GET SINGLE JOB
 */
export async function getJob(jobId) {

  const docRef =
    doc(db, "jobs", jobId);

  const docSnap =
    await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
}

/**
 * GET EMPLOYER JOBS
 */
export async function getEmployerJobs(
  employerId
) {

  const q = query(
    collection(db, "jobs"),
    where(
      "employerId",
      "==",
      employerId
    ),
    orderBy("createdAt", "desc")
  );

  const querySnapshot =
    await getDocs(q);

  const jobs = [];

  querySnapshot.forEach((doc) => {

    jobs.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return jobs;
}

/**
 * UPDATE JOB
 */
export async function updateJob(
  jobId,
  updatedData
) {

  const docRef =
    doc(db, "jobs", jobId);

  await updateDoc(
    docRef,
    updatedData
  );
}

/**
 * DELETE JOB
 */
export async function deleteJob(
  jobId
) {

  const docRef =
    doc(db, "jobs", jobId);

  await deleteDoc(docRef);
}