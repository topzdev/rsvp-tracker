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
import { useAuthContext } from "@/contexts/AuthContext";
import useRsvp from "@/hooks/useRsvp";
import { useEffect, useMemo, useState } from "react";

interface EventCardProps {
  event: Event;
  isPublic?: boolean;
  onDelete?: () => Promise<void>;
  onRSVP?: () => Promise<void>;
}

export default function EventCard({
  event,
  isPublic = false,
  onDelete,
  onRSVP,
}: EventCardProps) {
  const [info, setInfo] = useState<Event | null>(event);
  const [isRsvp, setIsRsvp] = useState(false);
  const { rsvp, deleteEvent } = useApi();
  const { isLoggedIn } = useAuthContext();
  const { addRsvp, checkRsvp } = useRsvp();

  useEffect(() => {
    setIsRsvp(checkRsvp(event.id));
  }, [event.id, checkRsvp]);

  const handleRSVP = async (id: number) => {
    if (isRsvp) {
      return;
    }

    setInfo((prev) => {
      if (!prev) return null;
      return { ...prev, guestCount: prev.guestCount + 1 };
    });

    const response = await rsvp(id);

    if (response) {
      addRsvp(id);
      setIsRsvp(true);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteEvent(id);
    await onDelete?.();
  };

  if (!info) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{info.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid gap-1">
          <div className="text-sm">
            <span className="font-medium">Date:</span> {info.date}
          </div>
          <div className="text-sm">
            <span className="font-medium">Time:</span> {info.time}
          </div>
          <div className="text-sm">
            <span className="font-medium">Location:</span> {info.location}
          </div>
          {isPublic && (
            <div className="text-sm">
              <span className="font-medium">Description:</span>{" "}
              {info.description}
            </div>
          )}
          <div className="text-sm mt-4">
            <span className="font-medium">RSVPs:</span> {info.guestCount} /{" "}
            {info.maxGuest} Max
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {isPublic ? (
          isLoggedIn ? (
            <Button
              onClick={() => handleRSVP(event.id)}
              disabled={info.guestCount >= info.maxGuest || isRsvp}
              variant="default"
              className="w-full"
            >
              {info.guestCount >= info.maxGuest
                ? "Event Full"
                : isRsvp
                ? "RSVP'd!"
                : "RSVP"}
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/login">Log In to RSVP</Link>
            </Button>
          )
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href={`/events/${event.id}`}>Edit</Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
