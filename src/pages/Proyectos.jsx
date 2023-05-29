import useProyectos from "../../hooks/useProyectos";
import Alerta from "../components/Alerta";
import PreviewProyecto from "../components/PreviewProyecto";

const Proyectos = () => {
  const { proyectos, alerta } = useProyectos();

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      {msg && <Alerta alerta={alerta} />}

      <div className="bg-white mt-10 shadow rounded-lg">
        {proyectos?.length > 0 ? (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="mt-5 text-center text-gray-600 uppercase p-5 ">
            No hay proyectos aún
          </p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
