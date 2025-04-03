import React, { useState } from "react";
import "../../../assets/styles/login.css";
import "../../../assets/styles/user.css";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import showAlert from "../utils/showAlert";
import { forgetPassword } from "../../../apiServices/apiService";

const Forget = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { EmailId: "" },
    validationSchema: Yup.object({
      EmailId: Yup.string().email("Invalid email").required("Email id is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await forgetPassword(values.EmailId);

        console.log(response)
        if (response.message === "Reset link sent successfully!") {
          showAlert("success", "Reset link sent successfully on regestered mail!", "Check your email for the reset link.");
        }
      } catch (error) {
        showAlert("error", "Something went wrong", "Please try again later!");
      } finally {
        setLoading(false);
      }
    }
  });

  const ErrorclassName = (formik, fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName]
      ? "form-control is-invalid input-padding "
      : "form-control input-padding";
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 g-0 d-xl-block d-lg-block d-md-block d-sm-none d-none">
          <div className="bg-img">
            <div className="p-5">
              <h2 className="text-white text-center">Reset Password</h2>
              <img
                src="/assets/img/forget-password1.png"
                alt="forfet-icon"
                className="w-100"
              />
              <h4 className="text-white text-center mt-3 mb-0">
                Fast, Efficient and Productive
              </h4>
            </div>
          </div>
        </div>
        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
          <div className="d-flex justify-content-center align-items-center height-reset flex-direction-column">
            <h2 className="text-blue d-xl-none d-lg-none d-md-none d-sm-block d-block text-center">
              Reset Password
            </h2>
            <h2 className="text-blue text-center">
              Enter your email to reset password
            </h2>
            <Form onSubmit={formik.handleSubmit}>
              <div className="row justify-content-center mt-5">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
                  <Form.Label>
                    Email Id<span className="text-danger ">*</span>
                  </Form.Label>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email Id"
                      className={ErrorclassName(formik, "EmailId")}
                      {...formik.getFieldProps("EmailId")}
                    />
                    {formik.touched.EmailId && formik.errors.EmailId ? (
                      <div className="invalid-feedback d-block">
                        {formik.errors.EmailId}
                      </div>
                    ) : null}
                    <p className="text-center mt-4">
                      <a
                        href="/project/1/auth/login"
                        className="text-decoration-none me-1"
                      >
                        <i className="fas fa-long-arrow-alt-left"></i> Back to
                        Login
                      </a>{" "}
                    </p>
                  </Form.Group>
                </div>

                <div className="d-flex justify-content-center ">
                  <button type="submit" className="btn btn-submit-login w-25">Submit</button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
