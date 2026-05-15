"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  getJob,
  updateJob,
} from "@/lib/firestore";

export default function EditJobPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // Form fields
  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    requirements,
    setRequirements,
  ] = useState("");

  const [
    contactEmail,
    setContactEmail,
  ] = useState("");

  const [
    contactPhone,
    setContactPhone,
  ] = useState("");

  /**
   * Load job
   */
  useEffect(() => {

    async function loadJob() {

      try {

        const job =
          await getJob(
            params.jobId
          );

        if (!job) {

          setError(
            "Job not found."
          );

          return;
        }

        setTitle(job.title);

        setDescription(
          job.description
        );

        setRequirements(
          job.requirements
        );

        setContactEmail(
          job.contactEmail
        );

        setContactPhone(
          job.contactPhone || ""
        );

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load job."
        );

      } finally {

        setLoading(false);
      }
    }

    loadJob();

  }, [params.jobId]);

  /**
   * Save changes
   */
  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setSaving(true);

      await updateJob(
        params.jobId,
        {
          title,
          description,
          requirements,
          contactEmail,
          contactPhone,
        }
      );

      router.push(
        "/dashboard"
      );

    } catch (err) {

      console.error(err);

      setError(
        "Failed to update job."
      );

    } finally {

      setSaving(false);
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

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-4xl font-bold mb-8">
          Edit Job
        </h1>

        {error && (

          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-6">

            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">
              Job Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={6}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block mb-2 font-medium">
              Requirements
            </label>

            <textarea
              rows={5}
              value={requirements}
              onChange={(e) =>
                setRequirements(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Contact Email
            </label>

            <input
              type="email"
              value={contactEmail}
              onChange={(e) =>
                setContactEmail(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium">
              Contact Phone
            </label>

            <input
              type="text"
              value={contactPhone}
              onChange={(e) =>
                setContactPhone(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-black text-white py-4 rounded-lg"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}