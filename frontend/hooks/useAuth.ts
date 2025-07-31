import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "");
  }, []);

  const login = (newUsername: string) => {
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUsername("");
    router.push("/login");
  };

  const isLoggedIn = !!username;

  return { username, isLoggedIn, login, logout };
};

export default useAuth;
