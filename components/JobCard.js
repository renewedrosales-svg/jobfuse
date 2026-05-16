import Link from "next/link";

import {
  BriefcaseBusiness,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export default function JobCard({
  job,
}) {

  return (
    <Link
      href={`/job/${job.id}`}
      className="group"
    >
      <article className="card p-6 h-full flex flex-col justify-between">

        {/* Top */}
        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 mb-5">

            <BriefcaseBusiness
              size={16}
            />

            Active Opportunity
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition">

            {job.title}
          </h2>

          {/* Description */}
          <p className="mt-4 text-slate-600 line-clamp-3">

            {job.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8">

          {/* Meta */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">

            <CalendarDays
              size={16}
            />

            <span>
              Recently Posted
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">

            <span className="font-semibold text-blue-600">

              View Details
            </span>

            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition">

              <ArrowRight
                size={18}
                className="text-blue-600 group-hover:text-white transition"
              />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}