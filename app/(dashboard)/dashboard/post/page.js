"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";

import { createJob } from "@/lib/firestore";

export default function PostJobPage() {

  const router = useRouter();

  // Form states
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [requirements, setRequirements] =
    useState("");

  const [contactEmail, setContactEmail] =
    useState("");

  const [contactPhone, setContactPhone] =
    useState("");

  // UI states
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /**
   * Handle job posting
   */
  async function handlePostJob(e) {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      const currentUser =
        auth.currentUser;

      // Safety check
      if (!currentUser) {
        throw new Error(
          "You must be signed in."
        );
      }

      // Create Firestore job
      await createJob({
        employerId:
          currentUser.uid,

        title,
        description,
        requirements,

        contactEmail,

        contactPhone,
      });

      // Redirect to dashboard
      router.push("/dashboard");

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Failed to create job"
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-4xl font-bold mb-8">
          Post a Job
        </h1>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handlePostJob}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">
              Job Title
            </label>

            <input
              type="text"
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Frontend Developer"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">
              Job Description
            </label>

            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe the role..."
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block mb-2 font-medium">
              Requirements
            </label>

            <textarea
              required
              rows={5}
              value={requirements}
              onChange={(e) =>
                setRequirements(
                  e.target.value
                )
              }
              placeholder="Required skills..."
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="block mb-2 font-medium">
              Contact Email
            </label>

            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) =>
                setContactEmail(
                  e.target.value
                )
              }
              placeholder="jobs@company.com"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Contact Phone */}
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
              placeholder="+234..."
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-lg hover:opacity-90 transition"
          >
            {loading
              ? "Posting Job..."
              : "Post Job"}
          </button>
        </form>
      </div>
    </main>
  );
}