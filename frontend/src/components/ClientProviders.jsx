'use client';

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { SettingsProvider } from '@/context/SettingsContext';

export default function ClientProviders({ initialSettings, children }) {
  return (
    <SettingsProvider initialSettings={initialSettings}>
      <AuthProvider>
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
        {children}
      </AuthProvider>
    </SettingsProvider>
  );
}
