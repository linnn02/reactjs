import { Formik, Form, Field, ErrorMessage } from "formik";
import "./App.css";
import * as Yup from "yup";
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

  const validationSchema = Yup.object({
  fullName: Yup.string().trim().required("Full name is required"),
  email: Yup.string().trim().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  course: Yup.string().required("Please select a course"),
  gender: Yup.string().required("Please select gender"),
  dob: Yup.date().required("Date of birth is required"),
  city: Yup.string().trim().required("City is required"),
  country: Yup.string().required("Country is required"),
  zip: Yup.string().matches(/^\d*$/, "Zip Code must contain only digits").nullable(),
});
  
  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form noValidate>
            <h1>Course Application</h1>

            <div>
              <Field name="fullName" placeholder="Full Name" autoComplete="name" />
              <ErrorMessage name="fullName" component="div" className="error" />
            </div>

            <div className="row">
              <div>
                <Field name="email" type="email" placeholder="Email" autoComplete="email" />
                <ErrorMessage name="email" component="div" className="error" />
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
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div>
              <label>Which course are you applying for?</label>
              <div className="radio">
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
              <ErrorMessage name="course" component="div" className="error" />
            </div>
            

            <div className="row">
              <div>
                <label>Date of birth</label>
                <Field name="dob" type="date" />
                <ErrorMessage name="dob" component="div" className="error" />
              </div>
              <div>
                <div className="radio2">
                  <label>
                    <Field type="radio" name="gender" value="male" /> Male
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="female" /> Female
                  </label>
                </div>
                <ErrorMessage name="gender" component="div" className="error" />
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

            <div className="row">
              <div>
                <Field name="city" placeholder="City" />
                <ErrorMessage name="city" component="div" className="error" />
              </div>
              <div>
                <Field name="state" placeholder="State" />
              </div>
            </div>

            <div className="row">
              <div>
                <Field name="zip" placeholder="Zip Code" inputMode="numeric" />
                <ErrorMessage name="zip" component="div" className="error" />
              </div>
              <div>
                <Field name="country" placeholder="Country" />
                <ErrorMessage name="country" component="div" className="error" />
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
