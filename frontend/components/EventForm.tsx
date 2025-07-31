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
import { useAuthContext } from "@/contexts/AuthContext";
import useApi from "@/hooks/useApi";
import { Textarea } from "./ui/textarea";

interface EventFormProps {
  id: string;
}

type EventForm = Omit<Event, "createdAt" | "updatedAt" | "username">;

export default function EventForm({ id }: EventFormProps) {
  const { username } = useAuthContext();
  const { getEventById, createEvent, updateEvent } = useApi();
  const router = useRouter();
  const isNew = id === "new";

  const [event, setEvent] = useState<EventForm>({
    id: 0,
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    maxGuest: 1,
    guestCount: 0,
  });

  async function fetchEvent() {
    const existingEvent = await getEventById(id);
    if (existingEvent) {
      setEvent(existingEvent);
    } else {
      router.push("/dashboard");
    }
  }

  useEffect(() => {
    if (!isNew) {
      fetchEvent();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    //TODO: Create or update event to backend
    e.preventDefault();
    if (isNew) {
      await createEvent(event);
    } else {
      await updateEvent(event);
    }
    router.push("/dashboard");
  };

  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
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
              name="name"
              value={event.name}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={event.date}
                onChange={handleChanges}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                type="time"
                id="time"
                name="time"
                value={event.time}
                onChange={handleChanges}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={event.location}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleChanges}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxGuest">Max RSVPs</Label>
            <Input
              type="number"
              id="maxGuest"
              name="maxGuest"
              value={event.maxGuest}
              onChange={handleChanges}
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
