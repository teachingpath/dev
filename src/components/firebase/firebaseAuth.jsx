import { useState, useEffect, useContext, createContext } from "react";
import { firebaseClient } from "./firebaseClient";
import nookies from "nookies";

// Set authentication context
const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set Cookie when firebase authentication token is changed
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      const cookieExpireIn = 30 * 24 * 60 * 60;
      if (!user) {
        setUser(null);
        // Remove token from cookie
        nookies.set(null, "token", "", {
          maxAge: cookieExpireIn,
        });
      } else {
        const token = await user.getIdToken();
        setUser(user);

        // Store token to cookie
        nookies.set(null, "token", token, {
          maxAge: cookieExpireIn,
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
