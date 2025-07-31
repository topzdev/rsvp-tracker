"use client";

import { Event } from "@/types/event";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: Event;
  isPublic?: boolean;
  onDelete?: (id: number) => void;
}

export default function EventCard({
  event,
  isPublic = false,
  onDelete,
}: EventCardProps) {
  const handleRSVP = (id: number) => {
    //TODO: RSVP to event
    alert("RSVP successful");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid gap-1">
          <div className="text-sm">
            <span className="font-medium">Date:</span> {event.date}
          </div>
          <div className="text-sm">
            <span className="font-medium">Time:</span> {event.time}
          </div>
          <div className="text-sm">
            <span className="font-medium">Location:</span> {event.location}
          </div>
          {isPublic && (
            <div className="text-sm">
              <span className="font-medium">Description:</span> Join us for this
              amazing event!
            </div>
          )}
          <div className="text-sm">
            <span className="font-medium">RSVPs:</span> {event.guestCount} /{" "}
            {event.maxGuest} Max
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {isPublic ? (
          <Button
            onClick={() => handleRSVP(event.id)}
            disabled={event.guestCount >= event.maxGuest}
            variant="default"
            className="w-full"
          >
            {event.guestCount >= event.maxGuest ? "Event Full" : "RSVP!"}
          </Button>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href={`/events/${event.id}`}>Edit</Link>
            </Button>
            <Button variant="destructive" onClick={() => onDelete?.(event.id)}>
              Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
