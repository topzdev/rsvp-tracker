"use client";

import Link from "next/link";
import { dummyEvents } from "@/data/events";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Public Events</h1>
          <Button variant="outline" asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyEvents.map((event) => (
            <EventCard key={event.id} event={event} isPublic={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
