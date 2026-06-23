'use client';

import { useEffect, useState } from 'react';

export function SignupCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/signup-count')
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {});
  }, []);

  if (count === null || count === 0) return null;

  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-charcoal/5 border border-charcoal/10 text-charcoal">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-gold"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
      </span>
      <span className="text-base font-semibold font-heading">
        {count} {count === 1 ? 'founder has' : 'founders have'} validated their ideas
      </span>
    </div>
  );
}
