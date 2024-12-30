// import React, { useState } from "react";
// import { Typography } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import Dialog from "@mui/material/Dialog";
// import toast, { Toaster } from "react-hot-toast";
// import "react-multi-carousel/lib/styles.css";
// import { IconX } from "@tabler/icons-react";
// import { IconArrowBadgeDown } from "@tabler/icons-react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import BASE_URL from "../../base/BaseUrl";
// import logo from "../../assets/receipt/ag_logo.png";
// import logo1 from "../../assets/receipt/home-banner.jpg";
// import { Slide } from "@mui/material";

// const validationSchema = Yup.object({
//   username: Yup.string()
//     .min(3, "Username must be at least 3 characters")
//     .required("Username is required"),
//   password: Yup.string()
//     .max(6, "Password must be max 4 characters")
//     .required("Password is required"),
// });

// const forgotPasswordValidationSchema = Yup.object({
//   username: Yup.string()
//     .min(3, "Username must be at least 3 characters")
//     .required("Username is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
// });

// const SignIn = () => {
//   const [showForm, setShowForm] = useState(true);
//   const [showForgotPasswordDialog, setShowForgotPasswordDialog] =
//     useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loading1, setLoading1] = useState(false);
//   const navigate = useNavigate();
//   const inputClass =
//     "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-300 border-red-200";

//   const handleSubmit = async (values, { setSubmitting }) => {
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("username", values.username);
//     formData.append("password", values.password);
//     console.log(formData);
//     try {
//       const res = await axios.post(`${BASE_URL}/panel-login`, formData);
//       console.log(res);

//       if (res.status === 200) {
//         const token = res.data.UserInfo?.token;

//         localStorage.setItem("id", res.data.UserInfo.user.id);
//         localStorage.setItem("username", res.data.UserInfo.user.name);
//         localStorage.setItem(
//           "user_type_id",
//           res.data.UserInfo.user.profile_type
//         );
//         localStorage.setItem("email", res.data.UserInfo.user.email);
//         localStorage.setItem(
//           "profile_photo",
//           res.data.UserInfo.user.profile_photo
//         );

//         if (token) {
//           localStorage.setItem("token", token);
//           navigate("/home");
//           setLoading(false);
//           setSubmitting(false);
//         } else {
//           toast.error("Login Failed, Token not received.");
//           setLoading(false);
//           setSubmitting(false);
//         }
//       } else {
//         toast.error("Login Failed, Please check your credentials.");
//         setLoading(false);
//         setSubmitting(false);
//       }
//     } catch (error) {
//       toast.error("An error occurred during login.");
//       setLoading(false);
//       setSubmitting(false);
//     }
//   };

//   const handleForgotPasswordSubmit = async (values, { setSubmitting }) => {
//     setLoading1(true);

//     const formData = new FormData();
//     formData.append("email", values.email);
//     formData.append("username", values.username);
//     console.log(formData);
//     try {
//       const res = await axios.post(`${BASE_URL}/panel-send-password`, formData);
//       if (res.data.code == "200") {
//         toast.success("New Password Sent to your Email");
//         setLoading1(false);
//       } else {
//         toast.error("Email not sent. Please try again.");
//         setLoading1(false);
//       }
//     } catch (error) {
//       toast.error("An error occurred during login.");
//       console.error("Error:", error);
//       setLoading1(false);
//     }
//   };

//   const handle1 = () => {
//     setShowForm(false);
//     setShowForgotPasswordDialog(true);
//   };
//   const handle2 = () => {
//     setShowForm(true);
//     setShowForgotPasswordDialog(false);
//   };
//   return (
//     <div
//       className="min-h-screen bg-red-100 relative bg-cover bg-center"
//       style={{ backgroundImage: `url(${logo1})` }}
//     >
//       {" "}
//       <Toaster position="top-right" reverseOrder={false} />
//       {/* Background Image Section */}
//       <div className="h-[600px] bg-cover bg-center relative">
//         <div className="absolute left-20 top-10 flex items-center text-black py-1 px-4 ">
//           <img src={logo} alt="logo" className="w-[20rem] h-[5rem]" />
//         </div>

//         <h6
//           onClick={() => setShowForm(!showForm)}
//           className="absolute right-20 top-10 flex items-center text-white py-1 px-4 border-dashed hover:border-b-2 hover:border-black hover:border-b-dashed cursor-pointer "
//         >
//           Login <IconArrowBadgeDown className="mt-1" />
//         </h6>
//         <div className="flex items-center justify-center text-8xl text-center h-full font-bold text-white">
//           AGARWAL SAMAJ VIKAS
//         </div>
//       </div>
//       <Dialog
//         open={showForm}
//         onClose={() => setShowForm(false)}
//         sx={{
//           "& .MuiDialog-container": {
//             "& .MuiPaper-root": {
//               width: "100%",
//               maxWidth: "384px",
//             },
//           },
//         }}
//         TransitionComponent={Slide}
//         transitionDuration={500}
//       >
//         <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm w-full relative">
//           <button
//             onClick={() => setShowForm(false)}
//             className="absolute top-2 right-2 text-gray-600 hover:text-black"
//           >
//             <IconX size={20} />
//           </button>
//           <div className="flex justify-center align-center">
//             <img src={logo} alt="logo" className="w-[20rem] h-[5rem]" />
//           </div>

//           <Typography
//             variant="h5"
//             className="text-center font-bold mb-4 text-blue-gray-600"
//           >
//             Welcome back! Please Login
//           </Typography>

//           <Formik
//             initialValues={{ username: "", password: "" }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ setFieldValue }) => (
//               <Form className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-black mb-1">
//                     Enter Your Username <span className="text-red-500">*</span>
//                   </label>
//                   <Field
//                     type="text"
//                     name="username"
//                     className={inputClass}
//                     onChange={(e) => {
//                       console.log("Username changing to:", e.target.value);
//                       setFieldValue("username", e.target.value);
//                     }}
//                   />
//                   <ErrorMessage
//                     name="username"
//                     component="div"
//                     className="text-red-500 text-xs mt-1"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-black mb-1">
//                     Password <span className="text-red-500">*</span>
//                   </label>
//                   <Field
//                     type="password"
//                     name="password"
//                     className={inputClass}
//                     onChange={(e) => {
//                       console.log("Password changing to:", e.target.value);
//                       setFieldValue("password", e.target.value);
//                     }}
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="div"
//                     className="text-red-500 text-xs mt-1"
//                   />
//                 </div>
//                 <div className="flex justify-center">
//                   <button
//                     className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
//                     type="submit"
//                     disabled={loading}
//                   >
//                     {loading ? "Checking..." : "Sign In"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//           {/* </Formik> */}
//           <div className="text-right mt-4">
//             <Link
//               className="text-sm text-gray-700 hover:text-blue-600"
//               onClick={handle1}
//             >
//               Forgot password?
//             </Link>
//           </div>
//         </div>
//       </Dialog>
//       <Dialog
//         open={showForgotPasswordDialog}
//         onClose={() => setShowForgotPasswordDialog(false)}
//         sx={{
//           "& .MuiDialog-container": {
//             "& .MuiPaper-root": {
//               width: "100%",
//               maxWidth: "384px",
//             },
//           },
//         }}
//         TransitionComponent={Slide}
//         transitionDuration={500}
//       >
//         <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm w-full relative ">
//           <button
//             onClick={() => setShowForgotPasswordDialog(false)}
//             className="absolute top-2 right-2 text-gray-600 hover:text-black"
//           >
//             <IconX size={20} />
//           </button>

//           <div className="flex justify-center align-center">
//             <img src={logo} alt="logo" className="w-[20rem] h-[5rem]" />
//           </div>
//           <Typography
//             variant="h5"
//             className="text-center font-bold mb-4 text-blue-gray-600"
//           >
//             Forgot Password
//           </Typography>
//           <Formik
//             initialValues={{ username: "", email: "" }}
//             validationSchema={forgotPasswordValidationSchema}
//             onSubmit={handleForgotPasswordSubmit}
//           >
//             {({ setFieldValue }) => (
//               <Form className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-black mb-1">
//                     Enter Your Username <span className="text-red-500">*</span>
//                   </label>
//                   <Field
//                     type="text"
//                     name="username"
//                     className={inputClass}
//                     onChange={(e) => {
//                       console.log("Username changing to:", e.target.value);
//                       setFieldValue("username", e.target.value);
//                     }}
//                   />
//                   <ErrorMessage
//                     name="username"
//                     component="div"
//                     className="text-red-500 text-xs mt-1"
//                   />
//                 </div>
//                 {/* ..next */}
//                 <div>
//                   <label className="block text-sm font-semibold text-black mb-1">
//                     Enter Your Email <span className="text-red-500">*</span>
//                   </label>

//                   <Field type="email" name="email" className={inputClass} />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     className="text-red-500 text-xs mt-1"
//                     onChange={(e) => {
//                       console.log("Password changing to:", e.target.value);
//                       setFieldValue("password", e.target.value);
//                     }}
//                   />
//                 </div>

//                 <div className="flex justify-center">
//                   <button
//                     className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
//                     type="submit"
//                     disabled={loading1}
//                   >
//                     {loading1 ? "Sending..." : "Submit"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//           <div className="text-right mt-4">
//             <Link
//               className="text-sm text-gray-700 hover:text-blue-600"
//               onClick={handle2}
//             >
//               Sigin?
//             </Link>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default SignIn;

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
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .max(6, "Password must be max 4 characters")
    .required("Password is required"),
});

const forgotPasswordValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
const SignIn = () => {
  const [showForm, setShowForm] = useState(true);
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const navigate = useNavigate();
  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-300 border-red-200";

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    console.log(formData);
    try {
      const res = await axios.post(`${BASE_URL}/panel-login`, formData);
      console.log(res);

      if (res.status === 200) {
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
          res.data.UserInfo.user.profile_photo
        );

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
        toast.error("Login Failed, Please check your credentials.");
        setLoading(false);
        setSubmitting(false);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
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
              <Link className="text-sm text-gray-700 hover:text-blue-600">
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
