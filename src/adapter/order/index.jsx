import * as yup from 'yup';
const today = new Date();
export const checkoutSchema = yup.object({
  first_name: yup.string().required('Please, First name can not blank').max(50).trim(),
  last_name: yup.string().required('Please, Last name can not blank').max(50).trim(),
  // phone: yup
  //   .string()
  //   .required(' Phone can not blank')
  //   .matches(/^0[3|7|8|9|5]\d{7,8}$/, 'Phonenumber is invalid'),
  email: yup
    .string()
    .required(' Email can not blank')
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is invalid'),
  address: yup.string().required('Please, Address can not blank').max(250).trim(),
});
