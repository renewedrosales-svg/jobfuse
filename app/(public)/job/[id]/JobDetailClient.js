"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  notFound,
} from "next/navigation";

import {
  Mail,
  Phone,
  ShieldAlert,
  CalendarDays,
  BriefcaseBusiness,
} from "lucide-react";

import {
  getJob,
} from "@/lib/firestore";

import ReportModal
from "@/components/ReportModal";

export default function JobDetailClient({
  jobId,
}) {

  const [job, setJob] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [reportOpen,
    setReportOpen] =
    useState(false);

  /**
   * Load job
   */
  useEffect(() => {

    async function loadJob() {

      try {

        const data =
          await getJob(jobId);

        if (!data) {

          notFound();
        }

        setJob(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    }

    loadJob();

  }, [jobId]);

  /**
   * Loading
   */
  if (loading) {

    return <JobDetailSkeleton />;
  }

  /**
   * Missing job
   */
  if (!job) {

    return (
      <main className="section">

        <div className="container-app">

          <div className="card-blue p-14 text-center">

            <h1 className="text-3xl font-bold mb-4">

              Job Not Found
            </h1>

            <p>
              This job may have been removed.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">

      <div className="container-app">

        <div className="grid lg:grid-cols-[1fr_360px] gap-10">

          {/* LEFT */}
          <div>

            {/* Hero */}
            <div className="card-blue p-8 lg:p-10">

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-medium mb-6">

                <BriefcaseBusiness
                  size={16}
                />

                Active Opportunity
              </div>

              <h1 className="text-4xl lg:text-5xl font-black leading-tight text-slate-900">

                {job.title}
              </h1>

              <div className="flex items-center gap-3 mt-6 text-slate-500">

                <CalendarDays
                  size={18}
                />

                <span>
                  Recently Posted
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="card p-8 mt-8">

              <h2 className="text-2xl font-bold mb-5">

                Job Description
              </h2>

              <p className="text-slate-600 whitespace-pre-wrap">

                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="card p-8 mt-8">

              <h2 className="text-2xl font-bold mb-5">

                Requirements
              </h2>

              <p className="text-slate-600 whitespace-pre-wrap">

                {job.requirements}
              </p>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside>

            <div className="sticky top-28 space-y-6">

              {/* Contact */}
              <div className="card p-6">

                <h3 className="text-xl font-bold mb-5">

                  Contact Employer
                </h3>

                <div className="space-y-4">

                  <a
                    href={`mailto:${job.contactEmail}`}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Mail size={18} />

                    Email Employer
                  </a>

                  {job.contactPhone && (

                    <a
                      href={`tel:${job.contactPhone}`}
                      className="btn-secondary w-full flex items-center justify-center gap-2"
                    >
                      <Phone size={18} />

                      Call Employer
                    </a>
                  )}
                </div>
              </div>

              {/* Report */}
              <div className="card p-6 border-red-100">

                <h3 className="text-lg font-bold mb-3">

                  Report Listing
                </h3>

                <p className="text-sm text-slate-500 mb-5">

                  Help keep JobFuse safe by reporting inappropriate listings.
                </p>

                <button
                  onClick={() =>
                    setReportOpen(true)
                  }
                  className="btn-danger w-full flex items-center justify-center gap-2"
                >
                  <ShieldAlert
                    size={18}
                  />

                  Report Job
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal */}
      <ReportModal
        isOpen={reportOpen}
        onClose={() =>
          setReportOpen(false)
        }
        jobId={job.id}
      />
    </main>
  );
}