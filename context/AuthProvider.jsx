import { createContext, useEffect, useState } from "react";
import clienteAxios from "../src/config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const cerrarSesionAuth = () => {
    setAuth({});
  };

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);
      } catch (error) {
        setAuth({});
      } finally {
        setCargando(false);
      }
    };

    return () => autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando, cerrarSesionAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
