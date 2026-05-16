import JobDetailClient
from "./JobDetailClient";

/**
 * SEO Metadata
 */
export async function generateMetadata({
  params,
}) {

  const resolvedParams =
    await params;

  return {

    title:
      "Job Opportunity",

    description:
      "View job details on JobFuse.",
  };
}

/**
 * Job Page
 */
export default async function JobPage({
  params,
}) {

  // IMPORTANT:
  // Await params in Next.js 16
  const resolvedParams =
    await params;

  return (
    <JobDetailClient
      jobId={
        resolvedParams.id
      }
    />
  );
}