"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "@/lib/firebase";

import {
  deleteJob,
  getJob,
  getReports,
} from "@/lib/firestore";

export default function AdminPage() {

  const router =
    useRouter();

  const [reports,
    setReports] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  /**
   * Load reports
   */
  async function loadReports() {

    try {

      const reportsData =
        await getReports();

      // Attach jobs
      const enriched =
        await Promise.all(
          reportsData.map(
            async (report) => {

              const job =
                await getJob(
                  report.jobId
                );

              return {
                ...report,
                job,
              };
            }
          )
        );

      setReports(enriched);

    } catch (err) {

      console.error(err);
    }
  }

  /**
   * Delete abusive job
   */
  async function handleDelete(
    jobId
  ) {

    const confirmed =
      window.confirm(
        "Delete this abusive job?"
      );

    if (!confirmed) return;

    try {

      await deleteJob(jobId);

      setReports((prev) =>
        prev.filter(
          (report) =>
            report.jobId !== jobId
        )
      );

    } catch (err) {

      console.error(err);

      alert(
        "Failed to delete job."
      );
    }
  }

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          // Not signed in
          if (!user) {

            router.push(
              "/signin"
            );

            return;
          }

          // Not admin
          if (
            user.email !==
            process.env
              .NEXT_PUBLIC_ADMIN_EMAIL
          ) {

            router.push(
              "/"
            );

            return;
          }

          // Load reports
          await loadReports();

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
          Loading admin panel...
        </p>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Admin Moderation Panel
        </h1>

        {/* Empty */}
        {reports.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

            <h2 className="text-2xl font-bold mb-3">
              No Reports
            </h2>

            <p className="text-gray-600">
              No jobs have been reported.
            </p>
          </div>

        ) : (

          <div className="space-y-6">

            {reports.map(
              (report) => (

                <div
                  key={report.id}
                  className="bg-white rounded-2xl shadow-sm p-6"
                >
                  <h2 className="text-2xl font-bold mb-3">
                    {
                      report.job?.title
                    }
                  </h2>

                  <p className="text-red-600 mb-4">
                    Reason:
                    {" "}
                    {report.reason}
                  </p>

                  <button
                    onClick={() =>
                      handleDelete(
                        report.jobId
                      )
                    }
                    className="bg-red-600 text-white px-5 py-3 rounded-lg"
                  >
                    Delete Job
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}