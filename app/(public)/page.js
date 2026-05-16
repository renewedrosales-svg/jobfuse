"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Search,
  BriefcaseBusiness,
  Building2,
  ShieldCheck,
} from "lucide-react";

import JobCard
from "@/components/JobCard";

import {
  getAllJobs,
} from "@/lib/firestore";

export default function HomePage() {

  const [jobs, setJobs] =
    useState([]);

  const [filteredJobs,
    setFilteredJobs] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  /**
   * Load jobs
   */
  useEffect(() => {

    async function loadJobs() {

      try {

        const data =
          await getAllJobs();

        setJobs(data);
        setFilteredJobs(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    }

    loadJobs();

  }, []);

  /**
   * Search filtering
   */
  useEffect(() => {

    const timeout =
      setTimeout(() => {

        if (!search.trim()) {

          setFilteredJobs(jobs);

          return;
        }

        const keyword =
          search.toLowerCase();

        const filtered =
          jobs.filter((job) => {

            return (
              job.title
                ?.toLowerCase()
                .includes(keyword) ||

              job.description
                ?.toLowerCase()
                .includes(keyword) ||

              job.requirements
                ?.toLowerCase()
                .includes(keyword)
            );
          });

        setFilteredJobs(filtered);

      }, 300);

    return () =>
      clearTimeout(timeout);

  }, [search, jobs]);

  return (
    <main>

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        <div className="container-app py-24">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-medium mb-6">

                <ShieldCheck size={18} />

                Trusted Modern Hiring Platform
              </div>

              <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none text-slate-900">

                Find Your
                <span className="block text-blue-600">
                  Next Opportunity
                </span>
              </h1>

              <p className="mt-7 text-xl text-slate-600 max-w-xl">

                JobFuse connects talented professionals with employers looking for top-quality talent across multiple industries.
              </p>

              {/* CTA */}
              <div className="mt-10 flex flex-wrap gap-4">

                <Link
                  href="/signup"
                  className="btn-primary"
                >
                  Post a Job
                </Link>

                <a
                  href="#jobs"
                  className="btn-secondary"
                >
                  Browse Jobs
                </a>
              </div>

              {/* Stats */}
              <div className="mt-14 grid grid-cols-3 gap-6">

                <div>
                  <h3 className="text-3xl font-bold text-blue-600">
                    100+
                  </h3>

                  <p className="text-sm">
                    Opportunities
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-blue-600">
                    50+
                  </h3>

                  <p className="text-sm">
                    Employers
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-blue-600">
                    24/7
                  </h3>

                  <p className="text-sm">
                    Accessibility
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative">

              <div className="card-blue p-8 lg:p-10 shadow-xl">

                <div className="flex items-center justify-between mb-8">

                  <div>
                    <p className="text-sm text-slate-500">
                      Featured Position
                    </p>

                    <h2 className="text-2xl font-bold mt-1">
                      Senior Frontend Developer
                    </h2>
                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center">

                    <BriefcaseBusiness
                      className="text-white"
                    />
                  </div>
                </div>

                <div className="space-y-5">

                  <div className="card p-5">

                    <div className="flex items-center gap-3">

                      <Building2
                        className="text-blue-600"
                      />

                      <div>
                        <h3 className="font-semibold">
                          Remote Opportunity
                        </h3>

                        <p className="text-sm">
                          Flexible working environment
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card p-5">

                    <div className="flex items-center gap-3">

                      <ShieldCheck
                        className="text-blue-600"
                      />

                      <div>
                        <h3 className="font-semibold">
                          Verified Employers
                        </h3>

                        <p className="text-sm">
                          Secure and trusted hiring
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card p-5">

                    <div className="flex items-center gap-3">

                      <Search
                        className="text-blue-600"
                      />

                      <div>
                        <h3 className="font-semibold">
                          Smart Search
                        </h3>

                        <p className="text-sm">
                          Quickly find relevant jobs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Blur */}
              <div className="absolute -z-10 top-10 right-10 h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= JOBS ================= */}

      <section
        id="jobs"
        className="section"
      >
        <div className="container-app">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">

            <div>

              <p className="text-blue-600 font-semibold mb-2">
                Opportunities
              </p>

              <h2 className="text-4xl font-bold">
                Latest Job Listings
              </h2>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-[420px]">

              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="input-modern pl-12"
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {[1,2,3,4,5,6]
                .map((item) => (

                <div
                  key={item}
                  className="card p-6 animate-pulse h-64"
                />
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading &&
            filteredJobs.length === 0 && (

            <div className="card-blue p-14 text-center">

              <h3 className="text-2xl font-bold mb-3">
                No Jobs Found
              </h3>

              <p>
                Try another keyword or check back later.
              </p>
            </div>
          )}

          {/* Jobs Grid */}
          {!loading &&
            filteredJobs.length > 0 && (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredJobs.map((job) => (

                <JobCard
                  key={job.id}
                  job={job}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}