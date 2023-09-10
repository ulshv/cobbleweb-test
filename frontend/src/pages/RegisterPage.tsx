import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, TextField } from '@mui/material';

import Centered from '../components/Centered';
import Card from '../components/Card';
import LoginHint from '../components/LoginHint';
import Title from '../components/Title';
import { API_URL } from '../constants';
import { registerSchema } from '../schemas/registerSchema';
import { formatError } from '../utils';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const files = fileList ? [...fileList] : [];

  return (
    <Centered>
      <Card style={{ width: 400 }}>
        <Title>Register</Title>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          validationSchema={registerSchema}
          onSubmit={(values, { setSubmitting }) => {
            const data = new FormData();

            data.append('firstName', values.firstName);
            data.append('lastName', values.lastName);
            data.append('email', values.email);
            data.append('password', values.password);

            files.forEach((file) => {
              data.append('photos', file, file.name);
            });

            fetch(`${API_URL}/api/auth/register`, {
              method: 'POST',
              body: data,
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  alert(
                    `You've successfuly registered. Now, please log in with your credentials.`,
                  );
                  navigate('/login');
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

              <div
                style={{
                  margin: '16px 0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Button variant="outlined" component="label">
                  Select Photos
                  <input
                    onChange={handleFileChange}
                    type="file"
                    hidden
                    multiple
                    accept="image/png, image/jpeg"
                  />
                </Button>
                <div
                  style={{
                    marginLeft: 8,
                    fontSize: 12,
                    color: files.length && files.length < 4 ? 'red' : 'black',
                  }}
                >
                  {files.length >= 4
                    ? `${files.length} photos selected`
                    : 'At least 4 photos should be selected'}

                  <br />
                </div>
              </div>

              <div style={{ margin: '16px 0' }}>
                <Button
                  disabled={
                    formik.isSubmitting ||
                    !formik.dirty ||
                    !formik.isValid ||
                    files.length < 4
                  }
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Register
                </Button>
              </div>

              <LoginHint>
                Already have an account? Please <Link to="/login">login</Link>.
              </LoginHint>
            </form>
          )}
        </Formik>
      </Card>
    </Centered>
  );
};

export default RegisterPage;
