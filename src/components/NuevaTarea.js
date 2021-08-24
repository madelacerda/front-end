import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions de Redux
import { crearNuevoTareaAction } from "../actions/tareaActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NuevaTarea = ({ history }) => {
  //State del componente
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  //Utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  //Acceder al state del store
  const cargando = useSelector((state) => state.tareas.loading);
  const error = useSelector((state) => state.tareas.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  //mandar llamar el action de productoAction
  const agregarTarea = (tarea) => dispatch(crearNuevoTareaAction(tarea));

  //Cuando el usuario haga submit
  const submitNuevoTarea = (e) => {
    e.preventDefault();

    //Validar formulario
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }

    //si no hay errores
    dispatch(ocultarAlertaAction());

    //Crear el nuevo producto
    agregarTarea({
      nombre,
      precio,
    });

    //Redireccionar
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nueva Tarea
            </h2>

            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoTarea}>
              <div className="form-group">
                <label>Nombre tarea</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Descripcion de Tarea"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Fecha tarea</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Fecha de la tarea"
                  name="text"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase
              d-block w-100"
              >
                Agregar
              </button>
            </form>

            {cargando ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un Error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaTarea;
