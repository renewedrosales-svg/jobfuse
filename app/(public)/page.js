/*"use client";

import { auth } from "@/lib/firebase";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        JobFuse
      </h1>

      <p className="text-gray-600">
        Firebase Connected Successfully
      </p>

      <p className="text-sm text-gray-500">
        Auth Ready: {auth ? "YES" : "NO"}
      </p>
    </main>
  );
}
  */

"use client";

import { useEffect, useState } from "react";

import JobCard from "@/components/JobCard";

import {
  getActiveJobs,
} from "@/lib/firestore";

export default function HomePage() {

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    async function loadJobs() {

      try {

        const jobsData =
          await getActiveJobs();

        setJobs(jobsData);

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load jobs."
        );

      } finally {

        setLoading(false);
      }
    }

    loadJobs();

  }, []);

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">

        <p className="text-lg">
          Loading jobs...
        </p>

      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">

        <p className="text-red-500">
          {error}
        </p>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="mb-10 text-center">

          <h1 className="text-5xl font-bold mb-4">
            Find Your Next Opportunity
          </h1>

          <p className="text-gray-600 text-lg">
            Browse active jobs from employers on JobFuse.
          </p>
        </div>

        {/* Empty State */}
        {jobs.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

            <h2 className="text-2xl font-bold mb-2">
              No Jobs Available
            </h2>

            <p className="text-gray-600">
              Employers have not posted jobs yet.
            </p>
          </div>

        ) : (

          /* Jobs Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {jobs.map((job) => (

              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}