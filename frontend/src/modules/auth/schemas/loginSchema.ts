import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Must be longer or equal to 6 characters')
    .max(50, 'Must me shorter or equal to 50 characters')
    .matches(/\d/, { message: 'Must contain at least one digit' }),
});
