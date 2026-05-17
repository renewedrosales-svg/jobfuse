export default function JobDetailSkeleton() {

  return (
    <main className="section"> 
    
      <div className="container-app">

        <div className="grid lg:grid-cols-[1fr_360px] gap-10">

          <div className="space-y-8">

            <div className="card-blue animate-pulse p-10 h-72" />

            <div className="card animate-pulse p-10 h-64" />

            <div className="card animate-pulse p-10 h-64" />
          </div>

          <div className="card animate-pulse h-96" />
        </div>
      </div>
    </main>
  );
}