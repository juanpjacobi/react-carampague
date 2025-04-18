import { createSelector } from "@reduxjs/toolkit";

const selectServiciosEntities = (state) => state.servicios.entities;
const selectServiciosAllIds = (state) => state.servicios.allIds;
const selectModalidadesEntities = (state) => state.modalidades.modalidades;
const selectModalidadesAllIds = (state) => state.modalidades.allIds;
const selectObjetivos = (state) => state.objetivos.objetivos;
const selectLineasServicioEntities = (state) => state.lineasServicio.entities;
const selectLineasServicioAllIds = (state) => state.lineasServicio.allIds;

export const selectAllLineasServicio = createSelector(
  [selectLineasServicioEntities, selectLineasServicioAllIds],
  (entities, allIds) => allIds.map((id) => entities[id]).filter(Boolean)
);

export const selectAllServicios = createSelector(
  [selectServiciosEntities, selectServiciosAllIds],
  (entities, allIds) => allIds.map((id) => entities[id]).filter(Boolean)
);

const selectAllModalidades = createSelector(
  [selectModalidadesEntities, selectModalidadesAllIds],
  (entities, allIds) => allIds.map((id) => entities[id]).filter(Boolean)
);

export const makeSelectServicioById = (servicioId) =>
  createSelector(
    [selectServiciosEntities],
    (entities) => entities[Number(servicioId)]
  );

export const makeSelectServicioEnriquecidoById = (servicioId) =>
  createSelector(
    [selectServiciosEntities, selectObjetivos, selectAllModalidades],
    (serviciosEntities, objetivos, modalidades) => {
      const servicio = serviciosEntities[Number(servicioId)];
      if (!servicio) return null;

      // Buscamos el objetivo por servicio.objetivo_id
      const objetivo = objetivos.find(
        (obj) => Number(obj.id) === Number(servicio.objetivo_id)
      );

      const modalidadesEnriquecidas = servicio.modalidades_ids
        ? servicio.modalidades_ids
            .map((modId) =>
              modalidades.find((mod) => Number(mod.id) === Number(modId))
            )
            .filter(Boolean)
        : [];

      return {
        ...servicio,
        objetivo,
        modalidades: modalidadesEnriquecidas,
      };
    }
  );

export const makeSelectLineasServicioByServicioId = (servicioId) =>
  createSelector([selectAllLineasServicio], (lineas) =>
    lineas.filter((linea) => Number(linea.servicio_id) === Number(servicioId))
  );

export const selectAllLineasServicioEnriquecidas = createSelector(
  [selectAllLineasServicio, selectAllServicios, selectObjetivos],
  (lineas, servicios, objetivos) => {
    return lineas.map((linea) => {
      // Buscamos el servicio asociado a la línea
      const servicio = servicios.find(
        (s) => Number(s.id) === Number(linea.servicio_id)
      );
      // Si encontramos el servicio, buscamos su objetivo (usando servicio.objetivo_id)
      let objetivo = null;
      if (servicio) {
        objetivo = objetivos.find(
          (obj) => Number(obj.id) === Number(servicio.objetivo_id)
        );
      }
      return {
        ...linea,
        servicio,
        objetivo,
      };
    });
  }
);

export const selectSortedLineasPlanEnriquecidas = createSelector(
  [selectAllLineasServicioEnriquecidas],
  (lineas) => {
    return lineas
      .filter((l) => l.is_planificado)
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }
);

export const makeSelectSortedLineasPlanEnriquecidasByServicioId = (
  servicioId
) =>
  createSelector([selectAllLineasServicioEnriquecidas], (lineas) =>
    lineas
      .filter(
        (l) =>
          Number(l.servicio_id) === Number(servicioId) &&
          l.is_planificado === true
      )
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
  );

export const makeSelectSortedLineasPlanEnriquecidasByObjetivoAndPeriod = (
  objetivoId,
  periodo
) =>
  createSelector([selectAllLineasServicioEnriquecidas], (lineas) => {
    return lineas
      .filter((l) => {
        if (!l.is_planificado) return false;
        // Se extrae el período de la línea (asumimos que la fecha tiene formato "YYYY-MM-DD")
        const [anio, mes] = l.fecha.split("-");
        const lineaPeriod = `${anio}-${mes}`;
        return (
          Number(l.servicio.objetivo_id) === Number(objetivoId) &&
          lineaPeriod === periodo
        );
      })
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  });
