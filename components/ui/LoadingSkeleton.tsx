'use client';

import { useEffect, useState } from 'react';

const loadingMessages = [
  'Analyzing your idea...',
  'Building a prototype structure...',
  'Designing the user flow...',
  'Adding interactive elements...',
  'Almost ready...',
];

export function LoadingSkeleton() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 800);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <svg className="animate-spin h-5 w-5 text-[#4A90D9]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-[#1A3A5C] font-medium animate-pulse">
            {loadingMessages[messageIndex]}
          </span>
        </div>
        <p className="text-sm text-gray-500">This usually takes about 90 seconds</p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-[#4A90D9] to-[#22C55E] transition-all duration-700 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
        </div>

        <div className="animate-pulse space-y-3 mt-6">
          <div className="h-4 bg-gray-200 rounded-lg w-full" />
          <div className="h-4 bg-gray-200 rounded-lg w-5/6" />
          <div className="h-4 bg-gray-200 rounded-lg w-4/6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse p-4 border border-gray-200 rounded-lg">
              <div className="h-6 bg-gray-200 rounded-lg w-2/3 mb-3" />
              <div className="h-4 bg-gray-200 rounded-lg w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded-lg w-3/4" />
            </div>
          ))}
        </div>

        <div className="animate-pulse flex gap-3 mt-6">
          <div className="h-12 bg-gray-200 rounded-lg w-40" />
          <div className="h-12 bg-gray-200 rounded-lg w-32" />
        </div>
      </div>
    </div>
  );
}
