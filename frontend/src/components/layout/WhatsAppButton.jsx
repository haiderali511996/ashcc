import { FaWhatsapp } from 'react-icons/fa';
import { useSettings } from '../../context/SettingsContext';

export default function WhatsAppButton() {
  const { settings } = useSettings();
  if (!settings.whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:scale-105 transition-transform"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}
