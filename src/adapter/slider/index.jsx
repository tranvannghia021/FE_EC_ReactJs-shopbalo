import * as yup from 'yup';

export const addSchemaSlider = yup.object({
  name: yup
    .string()
    .required('Please, Slider name can not blank')
    .max(128)
    .trim(),
  // amount: yup
  //   .string()
  //   .required(' Amount can not blank')
  //   .matches(/^[0-9]+$/, 'Amount can not number'),
  // price: yup
  //   .string()
  //   .required('Price can not blank')
  //   .matches(/^[0-9]+$/, 'Price can not number'),
  // image: yup.ObjectSchema().required('Image can not blank'),
  // image_slide: yup.string().required('Image Slide can not blank'),
  // description: yup.string().required('Image Slide can not blank'),
});

