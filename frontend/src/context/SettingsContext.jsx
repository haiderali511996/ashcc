'use client';

import { createContext, useContext, useState } from 'react';
import api from '@/lib/api';

const SettingsContext = createContext(null);

export const defaultSettings = {
  siteName: 'Al Sadiq Health Care Centre',
  tagline: 'Compassionate Care, Trusted Excellence',
  aboutText: '',
  mission: '',
  vision: '',
  address: 'Lahore, Pakistan',
  phone: '',
  whatsapp: '',
  email: '',
  mapEmbedUrl: '',
  openingHours: '',
  facebook: '',
  instagram: '',
  twitter: '',
  youtube: '',
};

export function SettingsProvider({ initialSettings, children }) {
  const [settings, setSettings] = useState({ ...defaultSettings, ...initialSettings });

  function refreshSettings() {
    return api.get('/settings').then((res) => setSettings({ ...defaultSettings, ...res.data }));
  }

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
