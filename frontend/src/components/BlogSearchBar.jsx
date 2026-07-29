'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiSearch } from 'react-icons/hi';

export default function BlogSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      params.delete('page');
      router.push(`/blog${params.toString() ? `?${params.toString()}` : ''}`);
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="mx-auto mb-10 max-w-md relative">
      <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
      <input
        className="input pl-11"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
