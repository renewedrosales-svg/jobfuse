import Link from "next/link";

export default function Footer() {

  return (
    <footer className="border-t border-blue-100 bg-white mt-20">

      <div className="container-app py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>

            <h2 className="text-2xl font-bold mb-3">
              JobFuse
            </h2>

            <p className="text-slate-500">
              Connecting employers with top talent through a modern job marketplace experience.
            </p>
          </div>

          {/* Navigation */}
          <div>

            <h3 className="font-semibold mb-4">
              Navigation
            </h3>

            <div className="flex flex-col gap-3 text-slate-600">

              <Link href="/">
                Browse Jobs
              </Link>

              <Link href="/signin">
                Employer Sign In
              </Link>

              <Link href="/signup">
                Post a Job
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>

            <h3 className="font-semibold mb-4">
              Platform
            </h3>

            <div className="flex flex-col gap-3 text-slate-600">

              <p>
                Built by Emmanuel Isu
              </p>

              <p>
                Responsive & SEO Ready
              </p>

              <p>
                © 2026 JobFuse
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}