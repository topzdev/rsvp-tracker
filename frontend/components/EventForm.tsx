"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";
import { dummyEvents } from "@/data/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EventFormProps {
  id: string;
  username: string;
}

type EventForm = Omit<Event, "createdAt" | "updatedAt">;

export default function EventForm({ id, username }: EventFormProps) {
  const router = useRouter();
  const isNew = id === "new";

  const [event, setEvent] = useState<EventForm>({
    id: dummyEvents.length + 1,
    name: "",
    date: "",
    time: "",
    location: "",
    maxGuest: 1,
    guestCount: 0,
    username: username,
  });

  useEffect(() => {
    if (!isNew) {
      //TODO: Replace this with API call to get event by id
      const existingEvent = dummyEvents.find((e) => e.id === parseInt(id));
      if (existingEvent) {
        setEvent(existingEvent);
      } else {
        router.push("/dashboard");
      }
    }
  }, [isNew, id, router]);

  const handleSubmit = (e: React.FormEvent) => {
    //TODO: Create or update event to backend
    e.preventDefault();
    if (isNew) {
      alert("Event created successfully!");
    } else {
      alert("Event updated successfully!");
    }
    router.push("/dashboard");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isNew ? "Create New Event" : "Edit Event"}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Logged in as: {username}
        </p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              value={event.name}
              onChange={(e) => setEvent({ ...event, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={event.date}
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                type="time"
                id="time"
                value={event.time}
                onChange={(e) => setEvent({ ...event, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={event.location}
              onChange={(e) => setEvent({ ...event, location: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxGuest">Max RSVPs</Label>
            <Input
              type="number"
              id="maxGuest"
              value={event.maxGuest}
              onChange={(e) =>
                setEvent({ ...event, maxGuest: parseInt(e.target.value) })
              }
              min="1"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isNew ? "Create Event" : "Update Event"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
