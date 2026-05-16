"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  BriefcaseBusiness,
  Plus,
  Eye,
} from "lucide-react";

import {
  auth,
} from "@/lib/firebase";

import {
  getEmployerJobs,
} from "@/lib/firestore";

import JobCard
from "@/components/JobCard";

export default function DashboardPage() {

  const router =
    useRouter();

  const [user, setUser] =
    useState(null);

  const [jobs, setJobs] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  /**
   * Load dashboard
   */
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (
          currentUser
        ) => {

          if (!currentUser) {

            router.replace(
              "/signin"
            );

            return;
          }

          await currentUser.reload();

          if (
            !currentUser.emailVerified
          ) {

            router.replace(
              "/verify-email"
            );

            return;
          }

          setUser(currentUser);

          try {

            const data =
              await getEmployerJobs(
                currentUser.uid
              );

            setJobs(data);

          } catch (err) {

            console.error(err);

          } finally {

            setLoading(false);
          }
        }
      );

    return () =>
      unsubscribe();

  }, [router]);

  /**
   * Loading UI
   */
  if (loading) {

    return (
      <main className="section">

        <div className="container-app">

          <div className="card p-10 animate-pulse h-[400px]" />

        </div>
      </main>
    );
  }

  return (
    <main className="section">

      <div className="container-app">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <p className="text-blue-600 font-semibold mb-2">

              Employer Dashboard
            </p>

            <h1 className="text-4xl lg:text-5xl font-black text-slate-900">

              Welcome Back
            </h1>

            <p className="text-slate-600 mt-3">

              Manage your job listings and track opportunities.
            </p>
          </div>

          <Link
            href="/dashboard/post"
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Plus size={20} />

            Post New Job
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          {/* Total Jobs */}
          <div className="card-blue p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">

                  Total Jobs
                </p>

                <h2 className="text-4xl font-black mt-2">

                  {jobs.length}
                </h2>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center">

                <BriefcaseBusiness
                  className="text-white"
                />
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="card p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">

                  Active Listings
                </p>

                <h2 className="text-4xl font-black mt-2">

                  {
                    jobs.filter(
                      (job) =>
                        job.isActive
                    ).length
                  }
                </h2>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center">

                <Eye
                  className="text-green-600"
                />
              </div>
            </div>
          </div>

          {/* Closed */}
          <div className="card p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">

                  Closed Jobs
                </p>

                <h2 className="text-4xl font-black mt-2">

                  {
                    jobs.filter(
                      (job) =>
                        !job.isActive
                    ).length
                  }
                </h2>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-red-100 flex items-center justify-center">

                <BriefcaseBusiness
                  className="text-red-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Jobs */}
        <div>

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold">

              Your Listings
            </h2>
          </div>

          {/* Empty */}
          {jobs.length === 0 && (

            <div className="card-blue p-14 text-center">

              <h3 className="text-3xl font-bold mb-4">

                No Jobs Posted Yet
              </h3>

              <p className="text-slate-600 mb-8">

                Start attracting candidates by creating your first job listing.
              </p>

              <Link
                href="/dashboard/post"
                className="btn-primary"
              >
                Post Your First Job
              </Link>
            </div>
          )}

          {/* Jobs Grid */}
          {jobs.length > 0 && (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {jobs.map((job) => (

                <JobCard
                  key={job.id}
                  job={job}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}