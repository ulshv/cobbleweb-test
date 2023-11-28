import * as Yup from 'yup';
import { loginSchema } from './loginSchema';

export const registerSchema = loginSchema.shape({
  firstName: Yup.string()
    .required('Required')
    .min(2, 'Must be longer or equal to 2 characters')
    .max(25, 'Must me shorter or equal to 25 characters'),
  lastName: Yup.string()
    .required('Required')
    .min(2, 'Must be longer or equal to 2 characters')
    .max(25, 'Must me shorter or equal to 25 characters'),
});
