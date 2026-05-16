"use client";

import {
  useState,
} from "react";

export default function ReportModal({
  isOpen,
  onClose,
  onSubmit,
}) {

  const [reason, setReason] =
    useState("Spam");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">
          Report Job
        </h2>

        <p className="text-gray-600 mb-4">
          Why are you reporting this job?
        </p>

        {/* Reason */}
        <select
          value={reason}
          onChange={(e) =>
            setReason(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-4 py-3 mb-6"
        >
          <option>
            Spam
          </option>

          <option>
            Fake Job
          </option>

          <option>
            Inappropriate
          </option>

          <option>
            Scam
          </option>

          <option>
            Other
          </option>
        </select>

        {/* Actions */}
        <div className="flex gap-3">

          <button
            onClick={() =>
              onClose()
            }
            className="flex-1 border border-black py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit(reason)
            }
            className="flex-1 bg-red-600 text-white py-3 rounded-lg"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}