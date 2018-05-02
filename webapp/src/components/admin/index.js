import React from 'react';
import PropTypes from 'prop-types';
// import { TextField } from 'office-ui-fabric-react/lib/TextField';
// import {
//   DetailsList,
//   DetailsListLayoutMode,
//   Selection,
//   SelectionMode,
//   IColumn
// } from 'office-ui-fabric-react/lib/DetailsList';
// import faker from 'faker';
import { graphql } from 'react-apollo';
import { Formik } from 'formik';
import {
  MessageBar,
  MessageBarType
} from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import Yup from 'yup';
import { CREATE_USER_MUTATION } from '../../graphql/admin.queries';

// const list = [
//   {
//     company: faker.company.companyName(),
//     users: [
//       { ...faker.helpers.createCard() },
//       { ...faker.helpers.createCard() }
//     ]
//   },
//   {
//     company: faker.company.companyName(),
//     users: [
//       { ...faker.helpers.createCard() },
//       { ...faker.helpers.createCard() }
//     ]
//   }
// ];
// console.log(list);

const Admin = ({ createUser }) => (
  <div style={{ paddingLeft: 20, paddingRight: 20 }}>
    <h2 className="ms-fontWeight-semilight">Companies</h2>
    <Formik
      initialValues={{
        displayName: '',
        email: '',
        password: ''
      }}
      validationSchema={() =>
        Yup.object().shape({
          displayName: Yup.string().required(),
          email: Yup.string()
            .required()
            .email(),
          password: Yup.string()
            .required()
            .min(8)
        })
      }
      onSubmit={(
        values,
        { setSubmitting, setErrors, setStatus, setValues, setTouched }
      ) => {
        try {
          createUser({
            variables: {
              userInput: {
                displayName: values.displayName,
                email: values.email,
                password: values.password
              }
            }
          });
          setStatus('User created successfully');
          setSubmitting(false);
          setValues({
            displayName: '',
            password: '',
            email: ''
          });
          setTouched({
            displayName: false,
            password: false,
            email: false
          });
        } catch (err) {
          setSubmitting(false);
          setErrors({ service: err.message });
        }
      }}
      render={({
        values,
        errors,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        setErrors,
        touched,
        status,
        setStatus
      }) => (
        <form onSubmit={handleSubmit}>
          <h2>New User</h2>
          {status && (
            <MessageBar
              messageBarType={MessageBarType.success}
              isMultiline={false}
              onDismiss={() => {
                setStatus(undefined);
              }}
              dismissButtonAriaLabel="Close"
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
            >
              {errors.service}
            </MessageBar>
          )}
          <TextField
            label="User name"
            required
            errorMessage={touched.displayName && errors.displayName}
            onChanged={displayName => setFieldValue('displayName', displayName)}
            value={values.displayName}
          />
          <TextField
            label="User Email"
            required
            errorMessage={touched.email && errors.email}
            onChanged={email => setFieldValue('email', email)}
            value={values.email}
            type="email"
          />
          <TextField
            label="Password"
            type="password"
            required
            errorMessage={touched.password && errors.password}
            onChanged={password => setFieldValue('password', password)}
            value={values.password}
          />
          <br />
          <DefaultButton
            primary
            disabled={isSubmitting}
            text="Add user"
            type="submit"
          />
        </form>
      )}
    />
  </div>
);

Admin.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default graphql(CREATE_USER_MUTATION, { name: 'createUser' })(Admin);
