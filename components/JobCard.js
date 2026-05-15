import Link from "next/link";

export default function JobCard({
  job,
}) {

  return (
    <Link
      href={`/job/${job.id}`}
      className="block bg-white rounded-2xl shadow-sm border hover:shadow-md transition p-6"
    >
      {/* Job Title */}
      <h2 className="text-2xl font-bold text-black mb-3">
        {job.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 line-clamp-3 mb-4">
        {job.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">

        {/* Status */}
        <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 text-sm px-3 py-1">
          Active
        </span>

        {/* CTA */}
        <span className="text-black font-medium">
          View Job →
        </span>
      </div>
    </Link>
  );
}