import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';

import Centered from '../components/Centered';
import Card from '../components/Card';
import LoginHint from '../components/LoginHint';
import Title from '../components/Title';
import { ACCESS_TOKEN_LS_KEY, API_URL } from '../constants';
import { formatError } from '../utils';
import { loginSchema } from '../schemas/loginSchema';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../redux/state/user';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState('');

  return (
    <Centered>
      <Card style={{ width: 400 }}>
        <Title>Login</Title>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            fetch(`${API_URL}/api/auth/login`, {
              method: 'POST',
              headers: {
                ['Content-Type']: 'application/json',
              },
              body: JSON.stringify({
                email: values.email,
                password: values.password,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  dispatch(setAccessToken(data.access_token));
                  localStorage.setItem(ACCESS_TOKEN_LS_KEY, data.access_token);
                  navigate('/profile');
                } else {
                  throw new Error(formatError(data.message));
                }
              })
              .catch((err) => {
                setServerError(err.message);
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {Boolean(serverError) && (
                <div style={{ marginBottom: 12, color: 'red' }}>
                  {serverError}
                </div>
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

              <div style={{ margin: '16px 0' }}>
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
              </div>

              <LoginHint>
                Don't have an account yet? Please{' '}
                <Link to="/register">register</Link>.
              </LoginHint>
            </form>
          )}
        </Formik>
      </Card>
    </Centered>
  );
};

export default LoginPage;
