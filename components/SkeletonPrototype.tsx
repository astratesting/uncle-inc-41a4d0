"use client";

export default function SkeletonPrototype({ idea }: { idea: string }) {
  return (
    <div className="mt-8 animate-pulse">
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-sky-100 rounded-full" />
          <div>
            <div className="h-4 w-32 bg-sky-100 rounded mb-2" />
            <div className="h-3 w-48 bg-sky-50 rounded" />
          </div>
        </div>
        <div className="h-24 bg-sky-50 rounded-lg" />
      </div>
    </div>
  );
}
