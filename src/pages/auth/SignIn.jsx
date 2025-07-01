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

const validationSchema = Yup.object({
  username: Yup.string()
    .min(1, "Profile Id must be at least 1 characters")
    .required("Profile Id  is required"),
  password: Yup.string()
    .max(6, "Password must be max 4 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-red-800";

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    console.log(formData);
    try {
      const res = await axios.post(`${BASE_URL}/panel-login`, formData);
      console.log(res);

      if (res.data.code == 200) {
        const token = res.data.UserInfo?.token;

        localStorage.setItem("id", res.data.UserInfo.user.id);
        localStorage.setItem("username", res.data.UserInfo.user.name);
        localStorage.setItem(
          "user_type_id",
          res.data.UserInfo.user.profile_type
        );
        localStorage.setItem("email", res.data.UserInfo.user.email);
        localStorage.setItem(
          "profile_photo",
          res.data.UserInfo.user.profile_full_face_photo_file_name
        );
        // localStorage.setItem(
        //   "profile_mobile",
        //   res.data.UserInfo.user.profile_mobile
        // );
        if (token) {
          localStorage.setItem("token", token);
          navigate("/home");
          setLoading(false);
          setSubmitting(false);
        } else {
          toast.error("Login Failed, Token not received.");
          setLoading(false);
          setSubmitting(false);
        }
      } else {
        toast.error(
          res.data.msg || "Login Failed, Please check your credentials."
        );
        setLoading(false);
        setSubmitting(false);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "An error occurred during login."
      );
      setLoading(false);
      setSubmitting(false);
    }
  };
  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1 ">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />

      <div className="flex flex-col lg:flex-row h-screen bg-blue-50">
        {/* Left Side - Image */}

        <div className="hidden lg:block lg:w-[50%] xl:block xl:w-[70%] h-full rounded-lg overflow-hidden p-4">
          <img
            src={logo1}
            alt="img 1"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center  justify-center px-4 lg:px-8 py-12 h-full lg:w-1/2">
          <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg  shadow-blue-600 ">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="Company Logo" className="w-35 h-35" />
            </div>

            <Typography
              variant="h6"
              className="text-center font-bold mb-6 text-blue-gray-800"
            >
              Sign into your account
            </Typography>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-1">
                      Enter Your Profile Id{" "}
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
                      Password <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className={inputClass}
                      onChange={(e) => {
                        console.log("Password changing to:", e.target.value);
                        setFieldValue("password", e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Checking..." : "Sign In"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="text-end mt-4">
              <Link
                to="/forget-password"
                className="text-sm text-gray-700 hover:text-blue-600"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
