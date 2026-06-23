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
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: '#C8A95115', color: '#C8A951', border: '1px solid #C8A95130' }}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#C8A951' }}></span>
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#C8A951' }}></span>
      </span>
      {count} {count === 1 ? 'founder has' : 'founders have'} joined
    </div>
  );
}
