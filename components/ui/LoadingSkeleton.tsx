export function SkeletonBlock({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`animate-pulse rounded-lg ${className}`}
      style={{ backgroundColor: '#e7e5e4', ...style }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e0d8' }}>
      <SkeletonBlock className="w-12 h-12 rounded-xl mb-3" />
      <SkeletonBlock className="w-24 h-4 mb-2" />
      <SkeletonBlock className="w-full h-3 mb-1" />
      <SkeletonBlock className="w-3/4 h-3" />
    </div>
  );
}

export function WelcomeSkeleton() {
  return (
    <div className="rounded-2xl p-8 mb-8" style={{ backgroundColor: '#e7e5e4' }}>
      <div className="flex items-center gap-3 mb-4">
        <SkeletonBlock className="w-10 h-10 rounded-full" style={{ backgroundColor: '#d6d3d1' }} />
        <div>
          <SkeletonBlock className="w-40 h-6 mb-1" style={{ backgroundColor: '#d6d3d1' }} />
          <SkeletonBlock className="w-24 h-3" style={{ backgroundColor: '#d6d3d1' }} />
        </div>
      </div>
      <SkeletonBlock className="w-3/4 h-4" style={{ backgroundColor: '#d6d3d1' }} />
    </div>
  );
}

export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <SkeletonBlock className="w-8 h-8 rounded-full flex-shrink-0" />
          <div className="flex-1">
            <SkeletonBlock className="w-2/3 h-3 mb-1" />
            <SkeletonBlock className="w-1/3 h-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
