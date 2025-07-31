import { useAuthContext } from "@/contexts/AuthContext";
import { Event } from "@/types/event";

export type AddEvent = Omit<
  Event,
  "id" | "createdAt" | "updatedAt" | "username"
>;
export type UpdateEvent = Omit<Event, "createdAt" | "updatedAt" | "username">;

const useApi = () => {
  const { username } = useAuthContext();
  const baseUrl = "http://localhost:3333/api";

  const authHeader = {
    headers: {
      "Content-Type": "application/json",
      ...(username && { Authorization: `${username}` }),
    },
  };

  const getEvents = async (): Promise<Event[]> => {
    const response = await fetch(`${baseUrl}/events`);
    return response.json();
  };

  const getUserEvents = async (): Promise<Event[]> => {
    const response = await fetch(`${baseUrl}/events/user/`, authHeader);
    return response.json();
  };

  const getEventById = async (id: string): Promise<Event> => {
    const response = await fetch(`${baseUrl}/events/${id}`, authHeader);
    return response.json();
  };

  const createEvent = async (event: AddEvent): Promise<Event> => {
    const response = await fetch(`${baseUrl}/events`, {
      method: "POST",
      body: JSON.stringify(event),
      ...authHeader,
    });
    return response.json();
  };

  const updateEvent = async (event: UpdateEvent): Promise<Event> => {
    const response = await fetch(`${baseUrl}/events/${event.id}`, {
      method: "PUT",
      body: JSON.stringify(event),
      ...authHeader,
    });
    return response.json();
  };

  const deleteEvent = async (id: number): Promise<void> => {
    await fetch(`${baseUrl}/events/${id}`, {
      method: "DELETE",
      ...authHeader,
    });
  };

  const rsvp = async (id: number): Promise<Event> => {
    const response = await fetch(`${baseUrl}/events/${id}/rsvp`, {
      method: "PUT",
      ...authHeader,
    });
    return response.json();
  };

  return {
    getEvents,
    getEventById,
    getUserEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    rsvp,
  };
};

export default useApi;
