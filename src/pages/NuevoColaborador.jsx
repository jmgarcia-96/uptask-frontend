import { useEffect } from "react";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../../hooks/useProyectos";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";

const NuevoColaborador = () => {
  const params = useParams();
  const { id } = params;

  const {
    obtenerProyecto,
    proyecto,
    cargando,
    colaborador,
    agregarColaborador,
    alerta,
  } = useProyectos();

  useEffect(() => {
    return () => obtenerProyecto(id);
  }, []);

  if (!proyecto?._id) return <Alerta alerta={alerta} />;

  //   if (cargando) return "Cargando...";
  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir Colaborador al proyecto: {proyecto.nombre}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {cargando ? (
        <p className="text-center">Cargando...</p>
      ) : (
        colaborador?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 lg:w-2/3 rounded-lg shadow">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado
              </h2>
              <div className="flex justify-between items-center">
                <p>{colaborador.nombre}</p>
                <button
                  type="button"
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold"
                  onClick={() =>
                    agregarColaborador({ email: colaborador.email })
                  }
                >
                  Agregar al proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NuevoColaborador;
