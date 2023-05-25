import { useEffect, useState } from "react";
import useProyectos from "../../hooks/useProyectos";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";

const FormularioProyecto = () => {
  const params = useParams();
  const { id } = params;
  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  const [nombre, setNombre] = useState(id ? proyecto.nombre : "");
  const [descripcion, setDescripcion] = useState(
    id ? proyecto.descripcion : ""
  );
  const [fechaEntrega, setFechaEntrega] = useState(
    id ? proyecto.fechaEntrega?.split("T")[0] : ""
  );
  const [cliente, setCliente] = useState(id ? proyecto.cliente : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    mostrarAlerta({});
    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });
    if (!id) {
      setNombre("");
      setDescripcion("");
      setFechaEntrega("");
      setCliente("");
    }
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre Proyecto
        </label>
        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Nombre del Proyecto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Descripción del Proyecto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >
          Fecha de Entrega
        </label>
        <input
          id="fecha-entrega"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="cliente"
        >
          Nombre Cliente
        </label>
        <input
          id="cliente"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Nombre del Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value={id ? "Actualizar Proyecto" : "Crear proyecto"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioProyecto;
