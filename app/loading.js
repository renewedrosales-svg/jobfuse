export default function Loading() {

  return (
    <main className="section">

      <div className="container-app">

        <div className="card p-14 text-center">

          <div className="h-14 w-14 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-6"></div>

          <h2 className="text-2xl font-bold">

            Loading...
          </h2>

          <p className="text-slate-500 mt-2">

            Please wait.
          </p>
        </div>
      </div>
    </main>
  );
}