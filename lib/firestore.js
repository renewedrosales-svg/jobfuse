import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment
} from "firebase/firestore";

import { db } from "./firebase";

/* =========================================
   CREATE JOB
========================================= */

export async function createJob(data) {

  const docRef = await addDoc(
    collection(db, "jobs"),
    {
      ...data,

      createdAt:
        serverTimestamp(),

      reportCount: 0,
    }
  );

  return docRef.id;
}

/* =========================================
   GET ALL ACTIVE JOBS
========================================= */

export async function getAllJobs() {

  const jobsRef =
    collection(db, "jobs");

  const q = query(
    jobsRef,
    where("isActive", "==", true),
    orderBy("createdAt", "desc")
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );
}

/* =========================================
   GET SINGLE JOB
========================================= */

export async function getJob(jobId) {

  const docRef = doc(
    db,
    "jobs",
    jobId
  );

  const snapshot =
    await getDoc(docRef);

  if (!snapshot.exists()) {

    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

/* =========================================
   GET EMPLOYER JOBS
========================================= */

export async function getEmployerJobs(
  employerId
) {

  const jobsRef =
    collection(db, "jobs");

  const q = query(
    jobsRef,
    where(
      "employerId",
      "==",
      employerId
    ),
    orderBy("createdAt", "desc")
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );
}

/* =========================================
   UPDATE JOB
========================================= */

export async function updateJob(
  jobId,
  data
) {

  const docRef = doc(
    db,
    "jobs",
    jobId
  );

  await updateDoc(docRef, data);
}

/* =========================================
   DELETE JOB
========================================= */

export async function deleteJob(
  jobId
) {

  const docRef = doc(
    db,
    "jobs",
    jobId
  );

  await deleteDoc(docRef);
}

/* =========================================
   REPORT JOB
========================================= */

export async function reportJob({
  jobId,
  reason,
}) {

  // Create report document
  await addDoc(
    collection(db, "reports"),
    {
      jobId,
      reason,

      reportedAt:
        serverTimestamp(),
    }
  );

  // Increment report count
  const jobRef = doc(
    db,
    "jobs",
    jobId
  );

  await updateDoc(jobRef, {
    reportCount:
      increment(1),
  });
}

/* =========================================
   GET REPORTS
========================================= */

export async function getReports() {

  const reportsRef =
    collection(db, "reports");

  const q = query(
    reportsRef,
    orderBy(
      "reportedAt",
      "desc"
    )
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );
}