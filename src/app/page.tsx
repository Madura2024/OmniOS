'use client';

import React, { useEffect } from 'react';
import Desktop from '@/components/shell/Desktop';
import { useOSStore } from '@/store/useOSStore';

export default function Home() {
  const { openWindow } = useOSStore();

  useEffect(() => {
    // Open a welcome window on start
    openWindow(
      'welcome',
      'Welcome to OmniOS',
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Welcome, Developer.</h1>
        <p className="opacity-70">
          This is OmniOS – your AI-native, modular personal operating system.
          Everything you see here is built for performance and absolute privacy.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 glass rounded-lg border-white/10">
            <h3 className="font-semibold mb-2">The Command Bar</h3>
            <p className="text-sm opacity-60">Press ⌘+K to open the global command center (Coming Soon).</p>
          </div>
          <div className="p-4 glass rounded-lg border-white/10">
            <h3 className="font-semibold mb-2">Plugin System</h3>
            <p className="text-sm opacity-60">Build your own widgets and adapters with ease.</p>
          </div>
        </div>
      </div>,
      '🚀'
    );
  }, [openWindow]);

  return (
    <main>
      <Desktop />
    </main>
  );
}
