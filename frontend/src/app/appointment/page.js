import PageHero from '@/components/PageHero';
import AppointmentForm from '@/components/AppointmentForm';

export const metadata = {
  title: 'Book Appointment',
  description:
    'Book an appointment at Al Sadiq Health Care Centre in Lahore — choose your department, preferred doctor, date, and time.',
};

export default function Appointment() {
  return (
    <div>
      <PageHero
        eyebrow="Book Appointment"
        title="Schedule Your Visit"
        subtitle="Fill in your details below and our team will confirm your appointment."
      />

      <section className="section">
        <div className="container-app max-w-3xl">
          <AppointmentForm />
        </div>
      </section>
    </div>
  );
}
