export default function JobCardSkeleton() {

  return (
    <div className="card animate-pulse p-6">

      <div className="flex items-center gap-4 mb-6">

        <div className="w-14 h-14 rounded-2xl bg-slate-200" />

        <div className="flex-1">

          <div className="h-5 bg-slate-200 rounded w-3/4 mb-3" />

          <div className="h-4 bg-slate-200 rounded w-1/2" />
        </div>
      </div>

      <div className="space-y-3">

        <div className="h-4 bg-slate-200 rounded" />

        <div className="h-4 bg-slate-200 rounded" />

        <div className="h-4 bg-slate-200 rounded w-5/6" />
      </div>

      <div className="h-12 bg-slate-200 rounded-2xl mt-8" />
    </div>
  );
}