import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { loginUser, verifyToken, logoutUser } from "../api/auth.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const login = async (data) => {
    try {
      const response = await loginUser(data);
      const user = response.data;
      setUser(user);
      setErrors([]);
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    } catch (e) {
      const { errors } = e.response.data;
      setErrors(errors);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    await logoutUser();
  };

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyToken();
        const user = response.data;
        setUser(user);
        setErrors([]);
        setIsAuthenticated(true);
      } catch (e) {
        console.error(e);
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };
    verify();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        errors,
        setErrors,
        login,
        logout,
      }}
    >
      {errors.length > 0 &&
        errors.map((error) => (
          <div className="errors-api">
            <p className="error-message">{error}</p>
          </div>
        ))}
      {children}
    </AuthContext.Provider>
  );
};
