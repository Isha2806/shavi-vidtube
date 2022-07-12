import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const useAuthentication = () => useContext(AuthContext);

const AuthenticationProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
  });
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [isLogin]);

  const logout = () => {
    localStorage.removeItem("Token");
    navigate("/");
    console.log("LOGGING IN");
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        isLogin,
        setIsLogin,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthentication, AuthenticationProvider };