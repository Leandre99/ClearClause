"use client";

import { useEffect, useState } from "react";

export function LoadingState({ messages }: { messages: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % messages.length),
      2200,
    );
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div
      className="fade-up mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr]"
      role="status"
      aria-live="polite"
    >
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="skeleton h-5 w-2/5" />
        <div className="mt-5 space-y-3">
          {[100, 92, 97, 70, 100, 88, 60].map((width, i) => (
            <div key={i} className="skeleton h-3.5" style={{ width: `${width}%` }} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm font-medium text-accent">{messages[index]}</p>
          <div className="skeleton mt-4 h-8 w-1/3" />
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton h-2" />
            ))}
          </div>
        </div>
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-5 shadow-card"
          >
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton mt-3 h-3 w-full" />
            <div className="skeleton mt-2 h-3 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
