import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarTareaAction } from "../actions/tareaActions";
import { useHistory } from "react-router-dom";

const EditarTareas = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //Nuevo state de tareas
  const [tarea, guardarTarea] = useState({
    nombre: "",
    fechacreacion: "",
    estado: "",
  });

  //tarea a editar
  const tareaeditar = useSelector((state) => state.tareas.tareaeditar);

  //Llenar el state automaticamente
  useEffect(() => {
    guardarTarea(tareaeditar);
  }, [tareaeditar]);

  //Leer los datos del formulario
  const onChangeFormulario = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, fechacreacion, estadot } = tarea;
  const submitEditarTarea = (e) => {
    e.preventDefault();
    dispatch(editarTareaAction(tarea));

    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Editar tarea</h2>
            <form onSubmit={submitEditarTarea}>
              <div className="form-group">
                <label>Tarea</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="nombre producto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label>Fecha de Tarea</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio producto"
                  name="precio"
                  value={fechacreacion}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio producto"
                  name="precio"
                  value={estadot}
                  onChange={onChangeFormulario}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase
              d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarTareas;
