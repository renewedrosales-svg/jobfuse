"use client";

export default function Error({
  error,
  reset,
}) {

  return (
    <main className="section">

      <div className="container-app">

        <div className="card p-14 text-center">

          <h1 className="text-4xl font-black text-red-600 mb-5">

            Something Went Wrong
          </h1>

          <p className="text-slate-600 mb-8">

            {error.message}
          </p>

          <button
            onClick={() =>
              reset()
            }
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
}