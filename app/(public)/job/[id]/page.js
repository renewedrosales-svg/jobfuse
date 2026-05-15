import Link from "next/link";

import {
  getJob,
} from "@/lib/firestore";

/**
 * SEO Metadata
 */
export async function generateMetadata({
  params,
}) {

  const job =
    await getJob(params.id);

  if (!job) {

    return {
      title: "Job Not Found",
    };
  }

  return {
    title:
      `${job.title} | JobFuse`,

    description:
      job.description.slice(0, 150),

    openGraph: {
      title:
        `${job.title} | JobFuse`,

      description:
        job.description.slice(0, 150),
    },
  };
}

export default async function JobDetailPage({
  params,
}) {

  const job =
    await getJob(params.id);

  // Job not found
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
            Back to homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
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
        <section>

          <h2 className="text-2xl font-semibold mb-4">
            Contact Employer
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">

            {/* Email */}
            <a
              href={`mailto:${job.contactEmail}`}
              className="bg-black text-white px-6 py-4 rounded-lg text-center"
            >
              Email Employer
            </a>

            {/* Phone */}
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
      </div>
    </main>
  );
}