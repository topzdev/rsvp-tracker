"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { dummyEvents } from "@/data/events";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { Event } from "@/types/event";

export default function DashboardPage() {
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const { username, logout, isLoggedIn } = useAuthContext();
  const { getUserEvents, deleteEvent } = useApi();

  const fetchEvents = async () => {
    const events = await getUserEvents();
    setUserEvents(events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Event Planner</h1>
          <div className="flex justify-center items-center gap-4 mt-4">
            <p className="text-muted-foreground">Logged in as: {username}</p>

            {isLoggedIn && (
              <Button variant="secondary" onClick={logout}>
                Log Out
              </Button>
            )}
          </div>
          <Button asChild className="mt-4">
            <Link href="/events/new">Create New Event</Link>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">My Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userEvents.map((event) => (
              <EventCard key={event.id} event={event} onDelete={fetchEvents} />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="link" asChild>
            <Link href="/">View Public Events</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
