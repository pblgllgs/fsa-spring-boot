/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

import { login as performLogin } from "../../services/client";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("access_token");
    if (token) {
      token = jwtDecode(token);
      setCustomer({
        username: token.sub,
        roles: token.scopes,
      });
    }
  },[]);

  const login = async (usernameAndPassword) => {
    return new Promise((resolve, reject) => {
      performLogin(usernameAndPassword)
        .then((res) => {
          const jwtToken = res.headers["authorization"];
          console.log(jwtToken)
          localStorage.setItem("access_token", jwtToken);
          const decodedToken = jwtDecode(jwtToken);
          setCustomer({
            username: decodedToken.sub,
            roles: decodedToken.scopes,
          });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const logOut = () => {
    localStorage.removeItem("access_token");
    setCustomer(null);
  };

  const isCustomerAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return false;
    }
    const decodedToken = jwtDecode(token);
    if (Date.now() > decodedToken.exp * 1000) {
      logOut();
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        login,
        logOut,
        isCustomerAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
