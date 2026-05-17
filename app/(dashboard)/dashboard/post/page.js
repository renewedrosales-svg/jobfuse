"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  auth,
} from "@/lib/firebase";

import {
  createJob,
} from "@/lib/firestore";

export default function PostJobPage() {

  const router =
    useRouter();

  const [form,
    setForm] =
    useState({
      title: "",
      description: "",
      requirements: "",
      contactEmail: "",
      contactPhone: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");
  
  /**
   * Handle input
   */
  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  }

  /**
   * Submit form
   */
  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const user =
        auth.currentUser;

      if (!user) {

        router.replace(
          "/signin"
        );

        return;
      }

      await createJob({
        ...form,

        employerId:
          user.uid,

        isActive: true,
      });

      router.push(
        "/dashboard"
      );

    } catch (err) {

      console.error(err);

      setError(
        "Failed to create job."
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <main className="section">

      <div className="container-app max-w-4xl">

        {/* Header */}
        <div className="mb-10">

          <p className="text-blue-600 font-semibold mb-2">

            Employer Dashboard
          </p>

          <h1 className="text-5xl font-black">

            Post a New Job
          </h1>

          <p className="text-slate-600 mt-4 text-lg">

            Create a professional listing and connect with talented candidates.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={
            handleSubmit
          }
          className="card p-8 lg:p-10 space-y-8"
        >

          {/* Error */}
          {error && (

            <div className="rounded-2xl bg-red-100 border border-red-200 px-5 py-4 text-red-700">

              {error}
            </div>
          )}

          {/* Title */}
          <div>

            <label className="block font-semibold mb-3">

              Job Title
            </label>

            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={
                handleChange
              }
              className="input-modern"
              placeholder="Frontend Developer"
            />
          </div>

          {/* Description */}
          <div>

            <label className="block font-semibold mb-3">

              Job Description
            </label>

            <textarea
              name="description"
              required
              rows={7}
              value={
                form.description
              }
              onChange={
                handleChange
              }
              className="input-modern resize-none"
              placeholder="Describe the role..."
            />
          </div>

          {/* Requirements */}
          <div>

            <label className="block font-semibold mb-3">

              Requirements
            </label>

            <textarea
              name="requirements"
              required
              rows={6}
              value={
                form.requirements
              }
              onChange={
                handleChange
              }
              className="input-modern resize-none"
              placeholder="List required skills..."
            />
          </div>

          {/* Email */}
          <div>

            <label className="block font-semibold mb-3">

              Contact Email
            </label>

            <input
              type="email"
              name="contactEmail"
              required
              value={
                form.contactEmail
              }
              onChange={
                handleChange
              }
              className="input-modern"
              placeholder="hr@company.com"
            />
          </div>

          {/* Phone */}
          <div>

            <label className="block font-semibold mb-3">

              Contact Phone
            </label>

            <input
              type="text"
              name="contactPhone"
              value={
                form.contactPhone
              }
              onChange={
                handleChange
              }
              className="input-modern"
              placeholder="+234..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading
              ? "Publishing Job..."
              : "Publish Job"}
          </button>
        </form>
      </div>
    </main>
  );
}