import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Empty } from "../../../components/shared/Empty";
import { DocumentacionList } from "../../../components/asociados/documentacion/DocumentacionList";
import { makeSelectDocumentacionConLineasByDocumentacionId } from "../../../store/selectors/DocumentacionSelectors";
import { makeSelectAsociadoById } from "../../../store/selectors/AsociadosSelectors"; // Asegúrate de tener este selector

export const DocumentacionAsociado = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const asociado = useSelector(makeSelectAsociadoById(id));

  const documentacionId = asociado ? asociado.documentacion_id : null;

  const documentacion = useSelector(
    makeSelectDocumentacionConLineasByDocumentacionId(documentacionId)
  );
  useEffect(() => {
    if (!documentacion) {
      navigate("/asociados", { replace: true });
    }
  }, [documentacion, navigate]);

  if (!documentacion) return null;

  if (
    !documentacion.lineas_documentacion ||
    documentacion.lineas_documentacion.length === 0
  ) {
    return (
      <Empty
        message="No se ha solicitado documentación para este asociado todavía"
        link={`/asociados/${id}/documentacion/crear`}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <h1 className="text-2xl text-sky-700 font-semibold text-center mb-5">
          {documentacion.descripcion}
        </h1>
        <div className="flex gap-5 items-center text-center">
        <Link
          to={`/asociados/${id}/documentacion/crear`}
          className="p-2 text-sm text-center font-bold bg-teal-600 hover:bg-teal-800 text-white rounded"
        >
          Solicitar documentación
        </Link>

        <Link
          to={`/asociados/${id}`}
          className="p-2 w-28 text-sm  text-center font-bold bg-sky-800 hover:bg-sky-950 text-white rounded"
        >
          Atrás
        </Link>
        </div>
      </div>
      <DocumentacionList documentacion={documentacion} />
    </>
  );
};
