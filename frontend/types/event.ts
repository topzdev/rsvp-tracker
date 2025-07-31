export interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  maxGuest: number;
  guestCount: number;
  username: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  username: string;
}
