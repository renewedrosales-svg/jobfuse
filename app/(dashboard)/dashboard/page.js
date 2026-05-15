"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "@/lib/firebase";

import {
  deleteJob,
  getEmployerJobs,
  updateJob,
} from "@/lib/firestore";

import EmployerJobCard
from "@/components/EmployerJobCard";

import { useRouter }
from "next/navigation";

export default function DashboardPage() {

  const router = useRouter();

  const [user, setUser] =
    useState(null);

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /**
   * Load employer jobs
   */
  async function loadJobs(
    employerId
  ) {

    try {

      const jobsData =
        await getEmployerJobs(
          employerId
        );

      setJobs(jobsData);

    } catch (err) {

      console.error(err);
    }
  }

  /**
   * Delete job
   */
  async function handleDelete(
    jobId
  ) {

    const confirmed =
      window.confirm(
        "Delete this job permanently?"
      );

    if (!confirmed) return;

    try {

      await deleteJob(jobId);

      // Refresh jobs
      setJobs((prev) =>
        prev.filter(
          (job) =>
            job.id !== jobId
        )
      );

    } catch (err) {

      console.error(err);

      alert(
        "Failed to delete job."
      );
    }
  }

  /**
   * Toggle active status
   */
  async function handleToggleStatus(
    job
  ) {

    try {

      await updateJob(
        job.id,
        {
          isActive:
            !job.isActive,
        }
      );

      // Refresh local state
      setJobs((prev) =>
        prev.map((item) => {

          if (
            item.id === job.id
          ) {

            return {
              ...item,
              isActive:
                !item.isActive,
            };
          }

          return item;
        })
      );

    } catch (err) {

      console.error(err);

      alert(
        "Failed to update job."
      );
    }
  }

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {

          if (!currentUser) {

            router.push(
              "/signin"
            );

            return;
          }

          if (
            !currentUser.emailVerified
          ) {

            router.push(
              "/verify-email"
            );

            return;
          }

          setUser(currentUser);

          // Load jobs
          await loadJobs(
            currentUser.uid
          );

          setLoading(false);
        }
      );

    return () =>
      unsubscribe();

  }, [router]);

  // Loading
  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <p>
          Loading dashboard...
        </p>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Employer Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Logged in as:
              {" "}
              {user?.email}
            </p>
          </div>

          {/* Post Job */}
          <Link
            href="/dashboard/post"
            className="bg-black text-white px-6 py-3 rounded-lg text-center"
          >
            Post New Job
          </Link>
        </div>

        {/* Empty State */}
        {jobs.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

            <h2 className="text-2xl font-bold mb-3">
              No Jobs Yet
            </h2>

            <p className="text-gray-600 mb-6">
              Start by posting your first job.
            </p>

            <Link
              href="/dashboard/post"
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Post Job
            </Link>
          </div>

        ) : (

          /* Jobs Grid */
          <div className="grid gap-6 md:grid-cols-2">

            {jobs.map((job) => (

              <EmployerJobCard
                key={job.id}
                job={job}
                onDelete={
                  handleDelete
                }
                onToggleStatus={
                  handleToggleStatus
                }
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}