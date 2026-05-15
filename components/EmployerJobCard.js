"use client";

import Link from "next/link";

export default function EmployerJobCard({
  job,
  onDelete,
  onToggleStatus,
}) {

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold mb-2">
            {job.title}
          </h2>

          <p className="text-sm text-gray-500">
            {job.isActive
              ? "Active"
              : "Closed"}
          </p>
        </div>

        {/* Status Badge */}
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            job.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {job.isActive
            ? "Active"
            : "Closed"}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-4 line-clamp-3">
        {job.description}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-6">

        {/* Edit */}
        <Link
          href={`/dashboard/edit/${job.id}`}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Edit
        </Link>

        {/* Toggle */}
        <button
          onClick={() =>
            onToggleStatus(job)
          }
          className="border border-black px-4 py-2 rounded-lg"
        >
          {job.isActive
            ? "Close Job"
            : "Reopen Job"}
        </button>

        {/* Delete */}
        <button
          onClick={() =>
            onDelete(job.id)
          }
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}