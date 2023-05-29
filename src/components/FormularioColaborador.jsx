import { useState } from "react";
import useProyectos from "../../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  const { alerta, mostrarAlerta, submitColaborador } = useProyectos();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      mostrarAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    await submitColaborador(email);
  };

  const { msg } = alerta;
  return (
    <form
      className="bg-white py-10 px-5 lg:w-3/5 xl:w-2/5 rounded-lg shadow w-full"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="email"
        >
          Email Colaborador
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email del usuario"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white
                    uppercase font-bold cursor-pointer transition-colors rounded text-sm"
        value="Buscar Colaborador"
      />
    </form>
  );
};

export default FormularioColaborador;
