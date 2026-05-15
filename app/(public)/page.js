"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import JobCard from "@/components/JobCard";

import SearchBar from "@/components/SearchBar";

import useDebounce from "@/hooks/useDebounce";

import {
  getActiveJobs,
} from "@/lib/firestore";

export default function HomePage() {

  // Jobs
  const [jobs, setJobs] =
    useState([]);

  // Search input
  const [searchTerm,
    setSearchTerm] =
    useState("");

  // Debounced search
  const debouncedSearch =
    useDebounce(
      searchTerm,
      300
    );

  // UI states
  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /**
   * Load jobs
   */
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

  /**
   * Filtered jobs
   */
  const filteredJobs =
    useMemo(() => {

      // Empty search
      if (!debouncedSearch.trim()) {
        return jobs;
      }

      const keyword =
        debouncedSearch.toLowerCase();

      return jobs.filter((job) => {

        return (
          job.title
            ?.toLowerCase()
            .includes(keyword)

          ||

          job.description
            ?.toLowerCase()
            .includes(keyword)

          ||

          job.requirements
            ?.toLowerCase()
            .includes(keyword)
        );
      });

    }, [jobs, debouncedSearch]);

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
        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold mb-4">
            Find Your Next Opportunity
          </h1>

          <p className="text-gray-600 text-lg">
            Browse active jobs from employers on JobFuse.
          </p>
        </div>

        {/* Search */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />

        {/* No Jobs */}
        {jobs.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

            <h2 className="text-2xl font-bold mb-2">
              No Jobs Available
            </h2>

            <p className="text-gray-600">
              Employers have not posted jobs yet.
            </p>
          </div>

        ) : filteredJobs.length === 0 ? (

          /* No Search Results */
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

            <h2 className="text-2xl font-bold mb-2">
              No Matching Jobs
            </h2>

            <p className="text-gray-600">
              Try a different keyword.
            </p>
          </div>

        ) : (

          /* Jobs Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredJobs.map((job) => (

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