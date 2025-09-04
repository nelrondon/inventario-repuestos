import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const useErrors = () => {
  const { errors, setErrors } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrors([]);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [errors, setErrors]);

  return { errors, setErrors };
};
