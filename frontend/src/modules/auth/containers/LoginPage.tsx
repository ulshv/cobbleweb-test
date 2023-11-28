import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';

import { useStore } from 'modules/shared';
import { loginSchema } from '../schemas/loginSchema';

import Centered from '../components/Centered';
import Card from '../components/Card';
import LoginHint from '../components/LoginHint';
import Title from '../components/Title';
import ApiError from '../components/ApiError';
import SubmitWrapper from '../components/SubmitWrapper';
import AuthForm from '../components/AuthForm';

const initialFormValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const { authStore } = useStore();

  return (
    <Centered>
      <Card>
        <Title>Login</Title>

        <Formik
          initialValues={initialFormValues}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            authStore.login(values, setSubmitting);
          }}
        >
          {(formik) => (
            <AuthForm onSubmit={formik.handleSubmit}>
              {Boolean(authStore.loginError) && (
                <ApiError>{authStore.loginError}</ApiError>
              )}

              <TextField
                {...formik.getFieldProps('email')}
                label="Email"
                size="small"
                margin="dense"
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />

              <TextField
                {...formik.getFieldProps('password')}
                label="Password"
                size="small"
                margin="dense"
                type="password"
                helperText={formik.touched.password && formik.errors.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />

              <SubmitWrapper>
                <Button
                  disabled={
                    formik.isSubmitting || !formik.dirty || !formik.isValid
                  }
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Login
                </Button>
              </SubmitWrapper>

              <LoginHint>
                Don't have an account yet? Please{' '}
                <Link to="/register">register</Link>.
              </LoginHint>
            </AuthForm>
          )}
        </Formik>
      </Card>
    </Centered>
  );
};

export default observer(LoginPage);
