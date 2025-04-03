import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import '../../../assets/styles/login.css';
import '../../../assets/styles/user.css';
import { useNavigate , Link } from "react-router-dom";
import { register } from "../../../apiServices/apiService";
import showAlert from "../utils/showAlert";
// import { success_swal_toast, error_swal_toast } from '../../SwalService';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);


  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters") 
      .max(50, "Name must be at most 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await register(values.name,values.email, values.password, values.confirmPassword );
                console.log(response);
              if (response.statusCode === 201) {
                showAlert("success", "Signup Successful", "Account created!");
                navigate("/project/1/auth/login");
              } else {
                showAlert("error", "Signup Failed", "User already exists.");
              }
            } catch (error) {
              showAlert("error", "Signup Error", "Something went wrong!");
            }
          },
})

  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 g-0 d-xl-block d-lg-block d-md-block d-sm-none d-none">
            <div className="bg-img">
              <div className="p-5">
                <h2 className="text-white text-center">Welcome</h2>
              <div className="d-flex justify-content-center align-items-center">
              <img src="/assets/img/login-sub-img.png" className="w-75" alt="Admin Portal"/>
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
                Welcome
              </h2>
              <h2 className="text-blue text-center">Please Signup First</h2>
              <Form onSubmit={formik.handleSubmit}>
                <div className="row justify-content-center mt-5">
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        isInvalid={formik.touched.name && !!formik.errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        type="email"
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
                  <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mb-3  ">
                    <Form.Label >Confirm Password</Form.Label>
                    <Form.Group className="mb-3 position-relative" controlId="formConfirmPassword">
                      <Form.Control
                       type={showPassword1 ? "text" : "password"}
                       name="confirmPassword"
                       placeholder="Enter your confirm password"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.confirmPassword}
                       isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                      />
                      <Link onClick={() => setShowPassword1(!showPassword1)} className="text-decoration-none text-dark position-absolute-eye">
                       <i className={`fas ${showPassword1 ? "fa-eye-slash " : "fa-eye "}`}></i>
                      </Link>
                      <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <p className="text-center mt-3">
                    Already have an account ?
                      <Link to="/project/1/auth/login" className="text-blue p-2">
                         Login
                      </Link>
                    </p>
                  </div>
                  
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-submit-login w-25">
                      Sign up
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Signup;
