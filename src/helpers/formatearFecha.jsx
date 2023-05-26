export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return fechaNueva;
};
