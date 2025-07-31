import EventForm from "@/components/EventForm";
import { useAuthContext } from "@/contexts/AuthContext";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <EventForm id={id} />
      </div>
    </div>
  );
}
