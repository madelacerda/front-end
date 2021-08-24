import {
  AGREGAR_TAREA,
  AGREGAR_TAREA_EXITO,
  AGREGAR_TAREA_ERROR,
  COMENZAR_DESCARGA_TAREAS,
  DESCARGA_TAREAS_ERROR,
  DESCARGA_TAREAS_EXITO,
  OBTENER_TAREA_ELIMINAR,
  TAREA_ELIMINADO_EXITO,
  TAREA_ELIMINADO_ERROR,
  OBTENER_TAREA_EDITAR,
  TAREA_EDITADO_EXITO,
  TAREA_EDITADO_ERROR,
  COMENZAR_EDICION_TAREA,
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//Crear nuevos tarea
export function crearNuevoTareaAction(tarea) {
  return async (dispatch) => {
    dispatch(agregarTarea());

    try {
      //Insertar en la API
      await clienteAxios.post("/tareas", tarea);

      //Si todo sale bien actualizar el state
      dispatch(agregarTareaExito(tarea));

      //Alerta
      Swal.fire("Correcto", "La tarea se agrego correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(agregarTareaError(true));

      //Alerta de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error,",
        text: "Hubo un error, intenta nuevamente",
      });
    }
  };
}

const agregarTarea = () => ({
  type: AGREGAR_TAREA,
  payload: true,
});

// Si el producto se guarda en la base de datos
const agregarTareaExito = (tarea) => ({
  type: AGREGAR_TAREA_EXITO,
  payload: tarea,
});
// si hubo un error

const agregarTareaError = (estado) => ({
  type: AGREGAR_TAREA_ERROR,
  payload: estado,
});

//Funcion que descarga los productos de la base de datos
export function obtenerTareaAction() {
  return async (dispatch) => {
    dispatch(descargarTarea());

    try {
      const respuesta = await clienteAxios.get("/tareas");
      dispatch(descargaTareaExitosa(respuesta.data));
      console.log(respuesta.data);
    } catch (error) {
      console.log(error);
      dispatch(descargaTareaError());
    }
  };
}

const descargarTarea = () => ({
  type: COMENZAR_DESCARGA_TAREAS,
  payload: true,
});

const descargaTareaExitosa = (tarea) => ({
  type: DESCARGA_TAREAS_EXITO,
  payload: tarea,
});

const descargaTareaError = () => ({
  type: DESCARGA_TAREAS_ERROR,
  payload: true,
});

//Seleciona y elimina la tarea
export function borrarTareaAction(id) {
  return async (dispatch) => {
    dispatch(obtenerTareaEliminar(id));

    try {
      await clienteAxios.delete(`/tarea/${id}`);

      dispatch(eliminarTareaExito());
      //Si se elimina mostrar alerta
      Swal.fire("Eliminado!", "la tarea fue eliminado.", "success");
    } catch (error) {
      console.log(error);
      dispatch(eliminarTareaError());
    }
  };
}

export const obtenerTareaEliminar = (id) => ({
  type: OBTENER_TAREA_ELIMINAR,
  payload: id,
});

const eliminarTareaExito = () => ({
  type: TAREA_ELIMINADO_EXITO,
});

const eliminarTareaError = () => ({
  type: TAREA_ELIMINADO_ERROR,
  payload: true,
});

//Colocar tarea en edicion
export function obtenerTareaEditar(tarea) {
  return (dispatch) => {
    dispatch(obtenerTareasAction(tarea));
  };
}

const obtenerTareasAction = (tarea) => ({
  type: OBTENER_TAREA_EDITAR,
  payload: tarea,
});

//Edita un registro en la api y state
export function editarTareaAction(tarea) {
  return async (dispatch) => {
    dispatch(editarTarea());
    try {
      await clienteAxios.put(`/tarea/${tarea.id}`, tarea);
      dispatch(editarTareaExito(tarea));
    } catch (error) {
      dispatch(editarTareaError());
    }
  };
}

const editarTarea = () => ({
  type: COMENZAR_EDICION_TAREA,
});

const editarTareaExito = (tarea) => ({
  type: TAREA_EDITADO_EXITO,
  payload: tarea,
});

const editarTareaError = () => ({
  type: TAREA_EDITADO_ERROR,
  payload: true,
});
