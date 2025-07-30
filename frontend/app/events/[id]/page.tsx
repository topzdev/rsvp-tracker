import EventForm from "@/components/EventForm";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const username = "john_doe";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <EventForm id={id} username={username} />
      </div>
    </div>
  );
}
