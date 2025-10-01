import { Formik, Form, Field, ErrorMessage } from "formik";
import "./App.css";

const isEmail = (v = "") =>
  /^(?:[a-zA-Z0-9_'^&+%`{}~|-]+(?:\.[a-zA-Z0-9_'^&+%`{}~|-]+)*)@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
    v.trim()
  );

function CourseForm() {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    phone: "",
    course: "",
    gender: "",
    dob: "",
    education: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!isEmail(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!values.course) {
      errors.course = "Please select a course";
    }

    if (!values.gender) {
      errors.gender = "Please select gender";
    }

    if (!values.dob) {
      errors.dob = "Date of birth is required";
    }

    if (!values.city.trim()) {
      errors.city = "City is required";
    }

    if (!values.country) {
      errors.country = "Country is required";
    }

    if (values.zip && !/^\d+$/.test(values.zip)) {
      errors.zip = "Zip Code must contain only digits";
    }

    return errors;
  };

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div>
      <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form noValidate>
            <h1>Course Application</h1>

            <div>
              <Field name="fullName" placeholder="Full Name" autoComplete="name" />
              <ErrorMessage name="fullName" component="div" className="error-message" />
            </div>

            <div className="row-2">
              <div>
                <Field name="email" type="email" placeholder="Email" autoComplete="email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div>
                <Field name="phone" type="tel" placeholder="Phone" autoComplete="tel" />
              </div>
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div>
              <label>Which course are you applying for?</label>
              <div className="radio-group">
                {[
                  { label: "Course A", value: "A" },
                  { label: "Course B", value: "B" },
                  { label: "Course C", value: "C" },
                ].map((c) => (
                  <label key={c.value}>
                    <Field type="radio" name="course" value={c.value} /> {c.label}
                  </label>
                ))}
              </div>
              <ErrorMessage name="course" component="div" className="error-message" />
            </div>

            <div className="row-2">
              <div>
                <label>Date of birth</label>
                <Field name="dob" type="date" />
                <ErrorMessage name="dob" component="div" className="error-message" />
              </div>
              <div>
                <label>Gender</label>
                <div className="radio-inline">
                  <label>
                    <Field type="radio" name="gender" value="male" /> Male
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="female" /> Female
                  </label>
                </div>
                <ErrorMessage name="gender" component="div" className="error-message" />
              </div>
            </div>

            <div>
              <label>Education</label>
              <Field as="select" name="education">
                <option value="">Select education</option>
                <option value="school">School</option>
                <option value="college">College</option>
                <option value="university">University</option>
              </Field>
            </div>

            <div>
              <Field as="textarea" rows={3} name="address" placeholder="Address" />
            </div>

            <div className="row-2">
              <div>
                <Field name="city" placeholder="City" />
                <ErrorMessage name="city" component="div" className="error-message" />
              </div>
              <div>
                <Field name="state" placeholder="State" />
              </div>
            </div>

            <div className="row-2">
              <div>
                <Field name="zip" placeholder="Zip Code" inputMode="numeric" />
                <ErrorMessage name="zip" component="div" className="error-message" />
              </div>
              <div>
                <Field name="country" placeholder="Country" />
                <ErrorMessage name="country" component="div" className="error-message" />
              </div>
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CourseForm;
