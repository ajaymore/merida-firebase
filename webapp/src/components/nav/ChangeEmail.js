import React from 'react';
import firebase from 'firebase/app';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Formik } from 'formik';
import {
  MessageBar,
  MessageBarType
} from 'office-ui-fabric-react/lib/MessageBar';
import Yup from 'yup';

const ChangeEmail = () => (
  <div>
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      onSubmit={async (
        values,
        { setSubmitting, setErrors, setStatus, setValues, setTouched }
      ) => {
        try {
          const { password } = values;
          const user = firebase.auth().currentUser;
          await user.updatePassword(password);
          setValues({ password: '', confirmPassword: '' });
          setTouched({ password: false, confirmPassword: false });
          setStatus('Password change successful');
          setSubmitting(false);
        } catch (err) {
          setSubmitting(false);
          setErrors({ service: err.message });
        }
      }}
      validationSchema={() =>
        Yup.object().shape({
          password: Yup.string().required(),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords does not match'
          )
        })
      }
      render={({
        handleSubmit,
        setErrors,
        errors,
        setFieldValue,
        values,
        isSubmitting,
        status,
        touched,
        setStatus
      }) => (
        <form onSubmit={handleSubmit}>
          {status && (
            <MessageBar
              messageBarType={MessageBarType.success}
              isMultiline={false}
              onDismiss={() => {
                setStatus(undefined);
              }}
              dismissButtonAriaLabel="Close"
              truncated
              overflowButtonAriaLabel="Overflow"
            >
              {status}
            </MessageBar>
          )}
          {errors.service && (
            <MessageBar
              messageBarType={MessageBarType.error}
              isMultiline={false}
              onDismiss={() => {
                setErrors({ service: '' });
              }}
              dismissButtonAriaLabel="Close"
              truncated
              overflowButtonAriaLabel="Overflow"
            >
              {errors.service}
            </MessageBar>
          )}
          <TextField
            label="Password"
            required
            onChanged={password => setFieldValue('password', password)}
            value={values.password}
            type="password"
            errorMessage={touched.password && errors.password}
          />
          <TextField
            label="Confirm password"
            required
            onChanged={confirmPassword =>
              setFieldValue('confirmPassword', confirmPassword)
            }
            value={values.confirmPassword}
            type="password"
            errorMessage={touched.confirmPassword && errors.confirmPassword}
          />
          <br />
          <DefaultButton
            primary
            disabled={isSubmitting}
            text="Login"
            type="submit"
          >
            Change Password
          </DefaultButton>
        </form>
      )}
    />
  </div>
);

export default ChangeEmail;
