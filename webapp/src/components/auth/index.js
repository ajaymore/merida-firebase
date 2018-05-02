import React from 'react';
import { Formik } from 'formik';
import Yup from 'yup';
import * as firebase from 'firebase/app';
import {
  MessageBar,
  MessageBarType
} from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { withWindowSize } from 'react-fns';
import PropTypes from 'prop-types';

const Auth = ({ height }) => (
  <div className="Auth-background" style={{ height }}>
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={() =>
        Yup.object().shape({
          email: Yup.string()
            .required('Email is required!')
            .email(),
          password: Yup.string().required('Password is required!')
        })
      }
      onSubmit={async (
        values,
        { setSubmitting, setErrors /* setValues and other goodies */ }
      ) => {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password);
        } catch (error) {
          setSubmitting(false);
          if (error.code === 'auth/user-not-found') {
            setErrors({ service: 'We could not find this user!' });
          } else if (error.code === 'auth/wrong-password') {
            setErrors({ service: 'Seems like you entered wrong password!' });
          } else {
            setErrors({ service: 'We failed to authenticate you!' });
          }
        }
      }}
      render={({
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        isSubmitting,
        setErrors
      }) => (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: 350,
            padding: 30,
            paddingTop: 10,
            margin: '0 auto',
            marginTop: 50,
            border: '1px solid rgba(0,0,0,.4)',
            boxShadow: '0 2px 3px rgba(0,0,0,.55)',
            backgroundColor: '#fff'
          }}
        >
          <h2>EHS Planner</h2>
          {errors.service && (
            <MessageBar
              messageBarType={MessageBarType.error}
              isMultiline={false}
              onDismiss={() => {
                setErrors({ service: '' });
              }}
              dismissButtonAriaLabel="Close"
            >
              {errors.service}
            </MessageBar>
          )}
          <TextField
            label="Email"
            required
            errorMessage={touched.email && errors.email}
            onChanged={email => setFieldValue('email', email)}
            value={values.email}
          />
          <TextField
            label="Password"
            required
            errorMessage={touched.password && errors.password}
            onChanged={password => setFieldValue('password', password)}
            value={values.password}
            type="password"
          />
          <br />
          <DefaultButton
            primary
            disabled={isSubmitting}
            text="Login"
            type="submit"
          />
        </form>
      )}
    />
  </div>
);

Auth.propTypes = {
  height: PropTypes.number.isRequired
};

export default withWindowSize(Auth);
