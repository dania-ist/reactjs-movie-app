import { createContext, SetStateAction, useEffect, useState } from "react";
import authConfig from "../configs/auth";
import instance from "../axios";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "../types/general";

interface IValues{
  user:null|User,
  loading:boolean,
  login: () => void,
  logout: ()=>void,
}
const defaultProvider:IValues = {
  user: null,
  loading: true,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};
const AuthContext = createContext(defaultProvider);

const AuthProvider = () => {
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      );
      if (storedToken) {
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authConfig?.token}`;
        setLoading(true);
        await instance
          .get(authConfig.meEndpoint, {})
          .then(async (response) => {
            setLoading(false);
            setUser({ ...response.data });
          })
          .catch(() => {
            // localStorage.removeItem("accessToken");
            // setUser(null);
            // navigate("/login");
          });
      } else {
        navigate("/login");
        setLoading(false);
      }
    };
    initAuth();
  }, [navigate]);

  const handleLogin = () => {
    window.localStorage.setItem(
      authConfig.storageTokenKeyName,
      authConfig.token
    );

    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    navigate("/login");
  };

  const values :IValues= {
    user,
    loading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}><Outlet/></AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
