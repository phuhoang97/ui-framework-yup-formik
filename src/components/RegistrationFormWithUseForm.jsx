import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

function RegistrationFormWithUseForm() {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
  });

  const onSubmit = async (data) => {
    try {
      // Gửi dữ liệu đăng ký lên server
      const response = await axios.post("http://localhost:8000/users", data);

      // Xử lý kết quả từ server (nếu cần)
      console.log("Registration successful:", response.data);

      // Hiển thị thông báo đăng ký thành công
      toast.success("Registration successful");
    } catch (error) {
      // Xử lý lỗi từ server (nếu có)
      console.error("Registration failed:", error);

      // Hiển thị thông báo lỗi
      toast.error("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' ref={register} />
        <div>{errors.username && <p>{errors.username.message}</p>}</div>
      </div>

      <div>
        <label htmlFor='email'>Email</label>
        <input type='text' name='email' ref={register} />
        <div>{errors.email && <p>{errors.email.message}</p>}</div>
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' ref={register} />
        <div>{errors.password && <p>{errors.password.message}</p>}</div>
      </div>

      <button type='submit'>Register</button>
    </form>
  );
}

export default RegistrationFormWithUseForm;
