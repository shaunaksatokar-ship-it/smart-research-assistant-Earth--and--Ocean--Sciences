export default function Skeleton({ height = 120 }) {
  return (
    <div
      className="w-full rounded-xl bg-slate-800 relative overflow-hidden"
      style={{ height }}
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
    </div>
  );
}

