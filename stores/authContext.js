import { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      //chiudere forzatamente il modal
      netlifyIdentity.close();

      console.log("======== CONGRATS =========");
      console.log(" => Login in Netlify");
      console.log("======== SUCCESSFUL =======");
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
      console.log("logout event");
    });

    netlifyIdentity.on("init", (user) => {
      setUser(user);
      setAuthReady(true);
      console.log("init event");
    });

    // init netlify identity connection
    netlifyIdentity.init();

    //cleanup
    return () => {
      netlifyIdentity.off("login");
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const context = { user, login, logout, authReady };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
