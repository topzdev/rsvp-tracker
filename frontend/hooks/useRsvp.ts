import { useAuthContext } from "@/contexts/AuthContext";
import useApi from "./useApi";

const useRsvp = () => {
  const { username } = useAuthContext();

  const addRsvp = (id: number) => {
    const localRsvp = localStorage.getItem(`rsvp-${username}`);
    const rsvpList = localRsvp ? localRsvp.split(",") : [];
    if (!rsvpList.includes(id.toString())) {
      rsvpList.push(id.toString());
      localStorage.setItem(`rsvp-${username}`, rsvpList.join(","));
    }
  };

  const checkRsvp = (id: number) => {
    const localRsvp = localStorage.getItem(`rsvp-${username}`);
    const rsvpList = localRsvp ? localRsvp.split(",") : [];
    return rsvpList.includes(id.toString());
  };

  return { addRsvp, checkRsvp };
};

export default useRsvp;
