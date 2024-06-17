import * as Yup from 'yup';

export const objetivoSchema = Yup.object().shape({
    nombre_objetivo: Yup.string().required('Requerido'),
    valor_cliente: Yup.number('Debe ser un numero').required('Requerido'),
    valor_vigilador: Yup.number('Debe ser un numero').required('Requerido'),
    cliente_id: Yup.number().required('Requerido'),
    activo: Yup.boolean().required('Requerido'),
    calle: Yup.string().required('Requerido'),
    numeracion: Yup.number('Debe ser un numero').required('Requerido'),
    barrio_id: Yup.number().required('Requerido'),
    piso: Yup.string().required('Requerido'),
    departamento: Yup.string().required('Requerido'),
   })