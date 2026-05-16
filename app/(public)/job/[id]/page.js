"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
} from "next/navigation";

import {
  getJob,
  reportJob,
} from "@/lib/firestore";

import ReportModal
from "@/components/ReportModal";

export default function JobDetailPage() {

  const params =
    useParams();

  const [job, setJob] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [reportOpen,
    setReportOpen] =
    useState(false);

  const [reported,
    setReported] =
    useState(false);

  /**
   * Load job
   */
  useEffect(() => {

    async function loadJob() {

      try {

        const data =
          await getJob(
            params.id
          );

        setJob(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    }

    loadJob();

  }, [params.id]);

  /**
   * Submit report
   */
  async function handleReport(
    reason
  ) {

    try {

      await reportJob({
        jobId: params.id,
        reason,
      });

      setReported(true);

      setReportOpen(false);

    } catch (err) {

      console.error(err);

      alert(
        "Failed to submit report."
      );
    }
  }

  // Loading
  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <p>
          Loading job...
        </p>

      </main>
    );
  }

  // Missing job
  if (!job) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-4xl font-bold mb-4">
            Job Not Found
          </h1>

          <Link
            href="/"
            className="text-blue-600"
          >
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gray-100 px-4 py-10">

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">

          {/* Title */}
          <h1 className="text-5xl font-bold mb-6">
            {job.title}
          </h1>

          {/* Description */}
          <section className="mb-10">

            <h2 className="text-2xl font-semibold mb-3">
              Job Description
            </h2>

            <p className="text-gray-700 whitespace-pre-line leading-8">
              {job.description}
            </p>
          </section>

          {/* Requirements */}
          <section className="mb-10">

            <h2 className="text-2xl font-semibold mb-3">
              Requirements
            </h2>

            <p className="text-gray-700 whitespace-pre-line leading-8">
              {job.requirements}
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">

            <h2 className="text-2xl font-semibold mb-4">
              Contact Employer
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">

              <a
                href={`mailto:${job.contactEmail}`}
                className="bg-black text-white px-6 py-4 rounded-lg text-center"
              >
                Email Employer
              </a>

              {job.contactPhone && (

                <a
                  href={`tel:${job.contactPhone}`}
                  className="border border-black px-6 py-4 rounded-lg text-center"
                >
                  Call Employer
                </a>
              )}
            </div>
          </section>

          {/* Report */}
          <section className="border-t pt-6">

            {reported ? (

              <p className="text-green-600 font-medium">
                Report submitted successfully.
              </p>

            ) : (

              <button
                onClick={() =>
                  setReportOpen(true)
                }
                className="text-red-600 font-medium"
              >
                Report This Job
              </button>
            )}
          </section>
        </div>
      </main>

      {/* Modal */}
      <ReportModal
        isOpen={reportOpen}
        onClose={() =>
          setReportOpen(false)
        }
        onSubmit={
          handleReport
        }
      />
    </>
  );
}