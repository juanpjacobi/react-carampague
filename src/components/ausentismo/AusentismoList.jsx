import { AusentismoListItem } from "./AusentismoListItem";

export const AusentismoList = ({
  lineas,
  onToggleJustificado,
}) => {
  return (
    <div className="flex flex-col mt-2 space-y-4">
      <div className="flex flex-col shadow-md md:shadow-gray-500">
      <table className="w-full text-sm text-left min-w-full border-collapse block md:table">
      <thead className="text-sm  text-slate-700 uppercase bg-slate-200 block md:table-header-group">
      <tr className="block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
      <th
                scope="col"
                className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Fecha
              </th>
              <th
                scope="col"
                className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Asociado
              </th>
              <th
                scope="col"
                className="p-2 font-bold md:border md:border-grey-500 block md:table-cell"
              >
                Total Horas
              </th>
              <th className="p-2 font-bold md:border md:border-grey-500 block md:table-cell">
                Justificado
              </th>
              <th className="p-2 font-bold md:border md:border-grey-500 block md:table-cell">
                Motivo
              </th>
              <th className="p-2 font-bold md:border md:border-grey-500 block md:table-cell">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {lineas.map((linea) => (
              <AusentismoListItem
                key={linea.id}
                linea={linea}
                onToggleJustificado={onToggleJustificado}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
