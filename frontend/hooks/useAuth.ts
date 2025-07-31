import { useEffect, useState } from "react";

const useAuth = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "");
  }, []);

  const login = (newUsername: string) => {
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUsername("");
  };

  const isLoggedIn = !!username;

  return { username, isLoggedIn, login, logout };
};

export default useAuth;
