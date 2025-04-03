import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../assets/styles/login.css";
import "../../../assets/styles/user.css";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import showAlert from "../utils/showAlert";
import { resetPassword } from "../../../apiServices/apiService";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await resetPassword(token, values.newPassword);
        console.log(response)

        if (response.message === "Password reset successfully!") {
          showAlert("success", "Password Reset Successful", "You can now log in with your new password.");
          navigate("/project/1/auth/login"); // Redirect to login page
        }
      } catch (error) {
        showAlert("error", "Something went wrong", error.response?.data?.message || "Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 g-0 d-xl-block d-lg-block d-md-block d-sm-none d-none">
          <div className="bg-img">
            <div className="p-5">
              <h2 className="text-white text-center">Create New Password</h2>
              <img src="/assets/img/forget-password1.png" alt="reset-password-icon" className="w-100" />
              <h4 className="text-white text-center mt-3 mb-0">
                Secure and Fast Recovery
              </h4>
            </div>
          </div>
        </div>
        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
          <div className="d-flex justify-content-center align-items-center height-reset flex-direction-column">
            <h2 className="text-blue text-center">Create Your New Password</h2>
            <Form onSubmit={formik.handleSubmit}>
              <div className="row justify-content-center mt-5">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
                  <Form.Label>New Password<span className="text-danger">*</span></Form.Label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      className={formik.touched.newPassword && formik.errors.newPassword ? "form-control is-invalid input-padding" : "form-control input-padding"}
                      {...formik.getFieldProps("newPassword")}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword && (
                      <div className="invalid-feedback d-block">{formik.errors.newPassword}</div>
                    )}
                  </Form.Group>
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
                  <Form.Label>Confirm Password<span className="text-danger">*</span></Form.Label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      className={formik.touched.confirmPassword && formik.errors.confirmPassword ? "form-control is-invalid input-padding" : "form-control input-padding"}
                      {...formik.getFieldProps("confirmPassword")}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <div className="invalid-feedback d-block">{formik.errors.confirmPassword}</div>
                    )}
                  </Form.Group>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-submit-login w-25" disabled={loading}>
                    {loading ? "Processing..." : "Submit"}
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

export default ResetPassword;
