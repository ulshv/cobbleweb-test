import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';

import { useStore } from 'modules/shared';
import { registerSchema } from '../schemas/registerSchema';

import Centered from '../components/Centered';
import Card from '../components/Card';
import LoginHint from '../components/LoginHint';
import Title from '../components/Title';
import AuthForm from '../components/AuthForm';
import ApiError from '../components/ApiError';
import SubmitWrapper from '../components/SubmitWrapper';
import PhotosSelectWrapper from '../components/PhotosSelectWrapper';
import PhotosSelectInfo from '../components/PhotosSelectInfo';

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const { authStore } = useStore();
  const { registerError, registerPhotos } = authStore;

  return (
    <Centered>
      <Card>
        <Title>Register</Title>

        <Formik
          initialValues={initialFormValues}
          validationSchema={registerSchema}
          onSubmit={(values, { setSubmitting }) => {
            authStore.register(values, setSubmitting);
          }}
        >
          {(formik) => (
            <AuthForm onSubmit={formik.handleSubmit}>
              {Boolean(registerError) && <ApiError>{registerError}</ApiError>}

              <TextField
                {...formik.getFieldProps('firstName')}
                label="First Name"
                size="small"
                margin="dense"
                helperText={formik.touched.firstName && formik.errors.firstName}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
              />

              <TextField
                {...formik.getFieldProps('lastName')}
                label="Last Name"
                size="small"
                margin="dense"
                helperText={formik.touched.lastName && formik.errors.lastName}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
              />

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

              <PhotosSelectWrapper>
                <Button variant="outlined" component="label">
                  Select Photos
                  <input
                    onChange={(ev) => authStore.setPhotos(ev)}
                    type="file"
                    hidden
                    multiple
                    accept="image/png, image/jpeg"
                  />
                </Button>

                <PhotosSelectInfo
                  style={{
                    color:
                      registerPhotos.length && registerPhotos.length < 4
                        ? 'red'
                        : 'black',
                  }}
                >
                  {registerPhotos.length >= 4
                    ? `${registerPhotos.length} photos selected`
                    : 'At least 4 photos should be selected'}

                  <br />
                </PhotosSelectInfo>
              </PhotosSelectWrapper>

              <SubmitWrapper>
                <Button
                  disabled={
                    formik.isSubmitting ||
                    !formik.dirty ||
                    !formik.isValid ||
                    registerPhotos.length < 4
                  }
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Register
                </Button>
              </SubmitWrapper>

              <LoginHint>
                Already have an account? Please <Link to="/login">login</Link>.
              </LoginHint>
            </AuthForm>
          )}
        </Formik>
      </Card>
    </Centered>
  );
};

export default observer(RegisterPage);
