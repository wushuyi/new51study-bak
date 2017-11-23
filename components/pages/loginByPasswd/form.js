import React from 'react';
import {withFormik} from 'formik';

const InnerForm = ({
                     values,
                     errors,
                     touched,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     isSubmitting,
                   }) => (
  <form onSubmit={handleSubmit}>
    <input
      className="input"
      type="email"
      name="email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
    />
    {/*{touched.email && errors.email && <div>{errors.email}</div>}*/}
    <input
      className="input"
      type="password"
      name="password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
    />
    {/*{touched.password && errors.password && <div>{errors.password}</div>}*/}
    <button className="button" type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </form>
);

const MyForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({email: '', password: ''}),
  // Add a custom validation function (this can be async too!)
  validate: (values, props) => {
    let errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  },
  // Submission handler
  handleSubmit: (values,
                 {
                   props,
                   setSubmitting,
                   setErrors /* setValues, setStatus, and other goodies */,
                 }) => {

    // setSubmitting(false);
    // LoginToMyApp(values).then(
    //   user => {
    //     setSubmitting(false);
    //     // do whatevs...
    //     // props.updateUser(user)
    //   },
    //   errors => {
    //     setSubmitting(false);
    //     // Maybe even transform your API's errors into the same shape as Formik's!
    //     setErrors((errors) => {
    //       console.log(errors);
    //     });
    //   }
    // );
  },
})(InnerForm);

export default MyForm;