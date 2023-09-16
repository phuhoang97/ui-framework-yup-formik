import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

function RegistrationFormWithFormik() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Gửi dữ liệu đăng ký lên server
      const response = await axios.post("http://localhost:8000/users", values);

      // Xử lý kết quả từ server (nếu cần)
      console.log("Registration successful:", response.data);

      // Hiển thị thông báo đăng ký thành công
      toast.success("Registration successful");
    } catch (error) {
      // Xử lý lỗi từ server (nếu có)
      console.error("Registration failed:", error);

      // Hiển thị thông báo lỗi
      toast.error("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <form>
          <div>
            <label htmlFor='username'>Username</label>
            <Field type='text' name='username' />
            <ErrorMessage name='username' component='div' />
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <Field type='text' name='email' />
            <ErrorMessage name='email' component='div' />
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <Field type='password' name='password' />
            <ErrorMessage name='password' component='div' />
          </div>

          <button type='submit' disabled={isSubmitting}>
            Register
          </button>
        </form>
      )}
    </Formik>
  );
}

export default RegistrationFormWithFormik;
