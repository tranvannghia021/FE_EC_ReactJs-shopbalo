import * as yup from 'yup';

export const addSchemaRole = yup.object({
  name: yup
    .string()
    .required('Please, Role name can not blank')
    .matches(/^[0-9a-zA-Z\s]+$/, 'Invalid role name format')
    .max(50)
    .trim(),
});
export const editSchemaRole = yup.object({
  name: yup
    .string()
    .required('Please, Role name can not blank')
    .matches(/^[0-9a-zA-Z\s]+$/, 'Invalid role name format')
    .max(50)
    .trim(),
});