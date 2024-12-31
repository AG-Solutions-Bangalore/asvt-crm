import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../assets/receipt/ag_logo.png";
import logo1 from "../../assets/receipt/home-banner.jpg";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const forgotPasswordValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
const handleForgotPasswordSubmit = async (values, { setSubmitting }) => {
  setLoading1(true);

  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("username", values.username);
  console.log(formData);
  try {
    const res = await axios.post(`${BASE_URL}/panel-send-password`, formData);
    if (res.data.code == "200") {
      toast.success("New Password Sent to your Email");
      setLoading1(false);
    } else {
      toast.error("Email not sent. Please try again.");
      setLoading1(false);
    }
  } catch (error) {
    toast.error("An error occurred during login.");
    console.error("Error:", error);
    setLoading1(false);
  }
};
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onResetPassword = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    try {
      const res = await axios.post(`${BASE_URL}/panel-send-password`, formData);
      if (res.data.code == "200") {
        toast.success("New Password Sent to your Email");
      } else {
        toast.error("Email not sent. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error("Error:", error);
    }
  };

  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-red-800";

  return (
    <>
      <Toaster
        toastOptions={{
          success: { style: { background: "green" } },
          error: { style: { background: "red" } },
        }}
        position="top-right"
        reverseOrder={false}
      />

      <div className="flex flex-col lg:flex-row h-screen bg-blue-50">
        <div className="hidden lg:block lg:w-[50%] xl:block xl:w-[70%] h-full rounded-lg overflow-hidden p-4">
          <img
            src={logo1}
            alt="img 1"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 flex items-center  justify-center px-4 lg:px-8 py-12 h-full lg:w-1/2">
          <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg  shadow-blue-600 ">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Company Logo" className="w-35 h-35" />
            </div>

            <Typography
              variant="h6"
              className="text-center font-bold mb-6 text-blue-gray-800"
            >
              Forgot Password
            </Typography>
            <Formik
              initialValues={{ username: "", email: "" }}
              validationSchema={forgotPasswordValidationSchema}
              onSubmit={onResetPassword}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">
                      Enter Your Username{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="username"
                      className={inputClass}
                      onChange={(e) => {
                        console.log("Username changing to:", e.target.value);
                        setFieldValue("username", e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">
                      Enter Your Email <span className="text-red-500">*</span>
                    </label>

                    <Field type="email" name="email" className={inputClass} />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                      onChange={(e) => {
                        console.log("Password changing to:", e.target.value);
                        setFieldValue("password", e.target.value);
                      }}
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="text-right mt-4">
              <Link
                to="/"
                className="text-sm text-gray-700 hover:text-blue-600"
              >
                Sigin?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
