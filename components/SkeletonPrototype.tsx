export default function SkeletonPrototype({ idea }: { idea: string }) {
  return (
    <div className="mt-8 animate-pulse">
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#E2E8F0] rounded-full" />
          <div>
            <div className="h-4 w-48 bg-[#E2E8F0] rounded mb-2" />
            <div className="h-3 w-64 bg-[#E2E8F0] rounded" />
          </div>
        </div>
        <div className="bg-[#F8FAFC] rounded-lg p-8 border border-dashed border-[#E2E8F0]">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#E2E8F0] rounded-full" />
          <div className="h-4 w-3/4 mx-auto bg-[#E2E8F0] rounded mb-2" />
          <div className="h-4 w-1/2 mx-auto bg-[#E2E8F0] rounded mb-4" />
          <div className="h-10 w-48 mx-auto bg-[#E2E8F0] rounded-lg" />
        </div>
        <p className="text-center text-sm text-[#94A3B8] mt-4">
          Generating prototype for &quot;{idea.slice(0, 50)}{idea.length > 50 ? "..." : ""}&quot;...
        </p>
      </div>
    </div>
  );
}
