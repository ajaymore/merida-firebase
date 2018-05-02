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
import { CREATE_COMPANY_MUTATION } from '../../graphql/super-admin.queries';

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

const SuperAdmin = ({ createCompany }) => (
  <div style={{ paddingLeft: 20, paddingRight: 20 }}>
    <h2 className="ms-fontWeight-semilight">Companies</h2>
    <Formik
      initialValues={{
        companyName: '',
        displayName: '',
        email: '',
        password: ''
      }}
      validationSchema={() =>
        Yup.object().shape({
          companyName: Yup.string().required(),
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
          createCompany({
            variables: {
              companyName: values.companyName,
              companyAdminInput: {
                displayName: values.displayName,
                email: values.email,
                password: values.password
              }
            }
          });
          setStatus('Company created successfully');
          setSubmitting(false);
          setValues({
            companyName: '',
            displayName: '',
            password: '',
            email: ''
          });
          setTouched({
            companyName: false,
            displayName: false,
            password: false,
            email: false
          });
        } catch (err) {
          console.log(err);
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
          <h2>New Company</h2>
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
            label="Company Name"
            required
            errorMessage={touched.companyName && errors.companyName}
            onChanged={companyName => setFieldValue('companyName', companyName)}
            value={values.companyName}
          />
          <TextField
            label="Admin name"
            required
            errorMessage={touched.displayName && errors.displayName}
            onChanged={displayName => setFieldValue('displayName', displayName)}
            value={values.displayName}
          />
          <TextField
            label="Admin Email"
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
            text="Add company"
            type="submit"
          />
        </form>
      )}
    />
  </div>
);

SuperAdmin.propTypes = {
  createCompany: PropTypes.func.isRequired
};

export default graphql(CREATE_COMPANY_MUTATION, { name: 'createCompany' })(
  SuperAdmin
);
