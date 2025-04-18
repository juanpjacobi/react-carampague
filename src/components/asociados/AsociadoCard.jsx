import { useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { useDispatch } from "react-redux";
import { toggleAsociadoActivo } from "../../store/thunks/AsociadosThunks";

export const AsociadoCard = ({ selectedAsociado }) => {
  const dispatch = useDispatch();
  const [activo, setActivo] = useState(selectedAsociado?.activo);

  const handleToggleActivo = async () => {
    await dispatch(toggleAsociadoActivo(selectedAsociado.id, setActivo));
  };

  return (
    <div className="w-full p-5 max-w-2xl m-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl underline-offset-8 uppercase text-sky-700 font-semibold text-center">
          {selectedAsociado?.apellido} {selectedAsociado?.nombre}
        </h1>

        <Link
          to={"/asociados/"}
          className="p-2 w-28 text-center bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atras
        </Link>
      </div>
      <div className="bg-white flex flex-col md:flex-row justify-between shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
        <div className="w-full md:w-3/4 md:border-r">
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Numero de asociado:
            </span>
            {selectedAsociado?.numero_asociado}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Cuit:
            </span>
            {selectedAsociado?.cuit_asociado}
          </p>

          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Telefono:
            </span>
            {selectedAsociado.telefono.numero_telefono} ({selectedAsociado.tipo_telefono.nombre})
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Fecha de alta:
            </span>
            {DateTime.fromISO(selectedAsociado?.fecha_alta).toLocaleString()}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Fecha de nacimiento:
            </span>
            {DateTime.fromISO(
              selectedAsociado?.fecha_nacimiento
            ).toLocaleString()}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Estado:
            </span>
            {activo ? "Activo" : "Inactivo"}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Estado civil:
            </span>
            {selectedAsociado?.estado_civil?.nombre}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Direccion
            </span>
            {selectedAsociado?.direccion?.calle}{" "}
            {selectedAsociado?.direccion?.numeracion}
          </p>

          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Piso
            </span>
            {selectedAsociado.piso ? selectedAsociado?.direccion?.piso : '-'}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Departamento
            </span>
            {selectedAsociado.departamento ? selectedAsociado?.direccion?.departamento : '-'}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Barrio
            </span>
            {selectedAsociado?.barrio?.nombre_barrio}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Localidad
            </span>
            {selectedAsociado?.localidad?.nombre}
          </p>
          <p className="text-sm mb-2 text-slate-800">
            <span className="text-md mr-2 font-bold text-sky-800 uppercase ">
              Provincia
            </span>
            {selectedAsociado?.provincia?.nombre}
          </p>
        </div>

        <div className="flex flex-col text-center border-t-2 md:border-none">
          <span className="text-md  mr-2 font-bold text-sky-800 uppercase border-b-2">
            Acciones
          </span>
          <div className="flex flex-col h-full gap-2 md:justify-around">
            <Link
              to={`/asociados/edit/${selectedAsociado?.id}`}
              className="p-2 w-full text-sm text-center bg-teal-600 hover:bg-teal-800 text-white rounded"
            >
              Editar
            </Link>
            <Link
              to={`/asociados/documentacion/${selectedAsociado?.id}`}
              className="p-2 w-full text-sm text-center bg-blue-600 hover:bg-blue-950 text-white rounded"
            >
              Ver documentación
            </Link>
            <Link
              to={`/asociados/${selectedAsociado?.id}/entrega-ropa`}
              className="p-2 w-full text-sm text-center bg-rose-600 hover:bg-rose-950 text-white rounded"
            >
              Entrega de ropa
            </Link>
            <button
              onClick={handleToggleActivo}
              className={`p-2 w-full text-sm text-center ${
                activo
                  ? "bg-red-600 hover:bg-red-950"
                  : "bg-green-600 hover:bg-green-950"
              } text-white rounded`}
            >
              {activo ? "Inactivar" : "Activar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
