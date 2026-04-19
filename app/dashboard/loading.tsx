// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Using your signature sky-blue accent */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-100 border-t-sky-600" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          Synchronizing Ledger...
        </p>
      </div>
    </div>
  )
}