import {
  ShieldCheck,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {

  return (
    <main className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT PANEL */}
      <section className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 text-white">

        {/* Blur Effects */}
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-4">

              <div className="h-16 w-16 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center">

                <BriefcaseBusiness
                  size={32}
                />
              </div>

              <div>
                <h1 className="text-4xl font-black">
                  JobFuse
                </h1>

                <p className="text-blue-100">
                  Modern Hiring Platform
                </p>
              </div>
            </div>

            <div className="mt-16 max-w-xl">

              <h2 className="text-6xl font-black leading-tight">

                Hire smarter.
                <span className="block text-cyan-200">
                  Grow faster.
                </span>
              </h2>

              <p className="mt-8 text-xl text-blue-100 leading-relaxed">

                Connect with talented professionals and manage opportunities through a modern recruitment experience.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-5">

            <div className="flex items-start gap-4 bg-white/10 rounded-2xl p-5 backdrop-blur-lg">

              <ShieldCheck
                className="mt-1"
              />

              <div>
                <h3 className="font-bold text-lg">
                  Verified Employers
                </h3>

                <p className="text-blue-100">
                  Secure and trusted hiring ecosystem.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 rounded-2xl p-5 backdrop-blur-lg">

              <Building2
                className="mt-1"
              />

              <div>
                <h3 className="font-bold text-lg">
                  Powerful Dashboard
                </h3>

                <p className="text-blue-100">
                  Manage listings and opportunities easily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="flex items-center justify-center bg-slate-50 px-6 py-12">

        <div className="w-full max-w-lg">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">

            <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">

              <BriefcaseBusiness />
            </div>

            <div>
              <h1 className="text-3xl font-black">
                JobFuse
              </h1>

              <p className="text-slate-500 text-sm">
                Modern Hiring Platform
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="mb-10">

            <h2 className="text-5xl font-black text-slate-900">

              {title}
            </h2>

            <p className="mt-4 text-lg text-slate-600">

              {subtitle}
            </p>
          </div>

          {/* Form Card */}
          <div className="card p-8 lg:p-10">

            {children}

          </div>
        </div>
      </section>
    </main>
  );
}