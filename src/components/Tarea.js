import React from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

//Redux
import { useDispatch } from "react-redux";
import { borrarTareaAction, obtenerTareaEditar } from "../actions/tareaActions";

const Tarea = ({ tarea }) => {
  const { nombre, id } = tarea;
  console.log(tarea);
  const dispatch = useDispatch();
  const history = useHistory(); //Habilitar history para redireccion

  //Confirmar si desea eliminar
  const confirmarEliminarTarea = (id) => {
    //Preguntar al usuarion
    Swal.fire({
      title: "Estas Seguro?",
      text: "Una tarea que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        //Pasarlo al action
        dispatch(borrarTareaAction(id));
      }
    });
  };

  //Funcion que redirige de forma programa
  const redireccionarEdicion = (tarea) => {
    dispatch(obtenerTareaEditar(tarea));
    history.push(`/tareas/editar/${tarea.id}`);
  };
  console.log(tarea);
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold"> $ {tarea}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redireccionarEdicion(tarea)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarTarea(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Tarea;
