import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import '../../../assets/styles/login.css';
import '../../../assets/styles/user.css';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../../apiServices/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showAlert from "../utils/showAlert";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";


const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
console.log(GOOGLE_CLIENT_ID)

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values.email, values.password);
        console.log(response.payload)
        if (response?.token) {
          toast.success("Login successful!");
          localStorage.setItem("token", response.token);
          sessionStorage.setItem("sessionActive", "true");
          localStorage.setItem("name", response.payload.name);
          showAlert("success", "Login Successful", "Welcome back!");
          navigate("/project/1/auth/dashboard");
        } else {
          showAlert("error", "Login Failed", "Invalid credentials");

        }
      } catch (error) {
        showAlert("error", "Login Error", "Something went wrong!");
      }
    },
  });

  // Google Login Success Handler
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/google", // Replace with your actual backend URL
        { token: response.credential }
      );

      console.log("Google Login Response:", res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("fullname", res.data.userDetails.fullname);
      toast.success("Google Login Successful!");
      navigate("/project/1/auth/dashboard");
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google Login Failed!");
    }
  };



  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 g-0 d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <div className="bg-img">
              <div className="p-5">
                <h2 className="text-white text-center">Welcome</h2>
                <div className="d-flex justify-content-center align-items-center">
                  <img src="/assets/img/login-sub-img.png" className="w-75" alt="Admin Portal" />
                </div>
                <h4 className="text-white text-center mt-3 mb-0">
                  Fast, Efficient and Productive
                </h4>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="d-flex justify-content-center align-items-center height-reset flex-direction-column">
              <h2 className="text-blue d-xl-none d-lg-none d-md-none d-sm-block d-block text-center">
                Welcome to Admin Portal
              </h2>
              <h2 className="text-blue text-center">Login to access your account</h2>
              <Form onSubmit={formik.handleSubmit}>
                <div className="row justify-content-center mt-5">
                  <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        isInvalid={formik.touched.email && !!formik.errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mb-3  ">
                    <Form.Label >Password</Form.Label>
                    <Form.Group className="mb-3 position-relative" controlId="formPassword">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                      />
                      <Link onClick={() => setShowPassword(!showPassword)} className="text-decoration-none text-dark position-absolute-eye">
                        <i className={`fas ${showPassword ? "fa-eye-slash " : "fa-eye "}`}></i>
                      </Link>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-submit-login w-25">
                      Submit
                    </button>
                  </div>
                  <p className="text-center mt-3">
                    <Link to="/project/1/auth/forget" className="text-blue">
                      Forgot Password?
                    </Link>
                  </p>
                  <p className="text-center mt-3">
                    Don't have an account ?
                    <Link to="/project/1/auth/signup" className="text-blue p-2">
                      Signup
                    </Link>
                  </p>
                </div>
              </Form>

              {/* Social Logins */}
              <div className="social-login">
                <h5 className="text-center mt-2">Or</h5>
                <div className="d-flex justify-content-center gap-3 mt-2">
                  {/* Google Login */}
                  <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => toast.error("Google Login Failed!")} />

                  {/* Facebook Login */}
                  <a href="https://www.facebook.com/v12.0/dialog/oauth?client_id=YOUR_FB_CLIENT_ID&redirect_uri=http://localhost:3000/auth/facebook/callback" className="btn btn-primary">
                    <i className="fab fa-facebook"></i> Facebook
                  </a>

                  {/* GitHub Login */}
                  <a href="https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&scope=user" className="btn btn-dark">
                    <i className="fab fa-github"></i> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
