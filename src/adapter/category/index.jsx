import * as yup from 'yup';

export const addSchemaCategory = yup.object({
    Category: yup
        .string()
        .required('Please, Category name can not blank')
        .min(6)
        .max(50)
        .trim(),

    // image: yup.ObjectSchema().required('Image is required'),

});
