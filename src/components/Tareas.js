import React, { useEffect } from "react";
import Tarea from "./Tarea";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { obtenerTareaAction } from "../actions/tareaActions";

const Tareas = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //Consultar la api
    const cargarTareas = () => dispatch(obtenerTareaAction());
    cargarTareas();
    // es-lint-disable-next-line
  }, []);

  //Obtener el STATEtareas
  const tareas = useSelector((state) => state.tareas.tareas);
  const error = useSelector((state) => state.tareas.error);
  const cargando = useSelector((state) => state.tareas.loading);
  console.log(tareas);

  return (
    <>
      <h2 className="text-center my-5">Listado de Tareas</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </p>
      ) : null}
      {cargando ? <p className="text-center">Cargando..........</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Descripcion</th>
            <th scope="col">Fecha Creacion</th>
            <th scope="col">Vigente</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.length === 0
            ? "No hay tareas"
            : tareas.map((tarea) => <Tarea key={tarea.id} tarea={tarea} />)}
        </tbody>
      </table>
    </>
  );
};

export default Tareas;
