import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import BASE_URL, { ImagePath, NoImagePath } from "../../base/BaseUrl";
import {
  IconCurrencyRupee,
  IconInfoCircle,
  IconPhone,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { Button, ButtonGroup, IconButton } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SelectInput from "../../components/common/SelectInput";
import { Tab, Tabs } from "@mui/material";
import SelectInputOne from "../../components/common/SelectInputOne";
import { IconArrowBack } from "@tabler/icons-react";

const validationSchema = Yup.object({
  //new

  profile_first_name: Yup.string().required("Full Name is required"),
  profile_gender: Yup.string().required("Gender is required"),
  profile_date_of_birth: Yup.string().required("Date of Birth is required"),
  profile_time_of_birth: Yup.string().required("Time of Birth is required"),
  profile_place_of_birth: Yup.string().required("Place of Birth is required"),
  email: Yup.string().required("email  is required"),
  profile_education_qualification: Yup.string().required(
    "Education  is required"
  ),
  profile_comunity_name: Yup.string().required("Community  is required"),
  profile_gotra: Yup.string().required("Gotra  is required"),
  profile_marry_in_comunity: Yup.string().required(
    "Community Preferences  is required"
  ),
  // profile_height_feet: Yup.number().required("Feet is required"),
  // profile_height_inches: Yup.number().required("Inches is required"),

  profile_father_full_name: Yup.string().required("Father Name is required"),
  profile_mother_full_name: Yup.string().required("Mother Name is required"),
  profile_profession: Yup.string().required("profession is required"),

  profile_married_brother: Yup.string().required("Brother Married is required"),
  profile_unmarried_brother: Yup.string().required(
    "Brother UnMarried is required"
  ),
  profile_married_sister: Yup.string().required("Sister Married is required"),
  profile_unmarried_sister: Yup.string().required(
    "Sister UnMarried is required"
  ),
  profile_current_resid_address: Yup.string().required(
    "Current Residential Address is required"
  ),
  profile_num_of_years_at_this_address: Yup.string().required(
    "Number of Years at the address is required"
  ),
  profile_house_type: Yup.string().required("House Type is required"),
  profile_physical_disablity: Yup.string().required(
    "Physical Disable is required"
  ),
  profile_have_married_before: Yup.string().required(
    "Married Before is required"
  ),
  profile_will_marry_in_same_gotra: Yup.string().required(
    "marry in same Gotra is required"
  ),
  profile_is_manglik: Yup.string().required("Manglik is required"),
  profile_will_marry_manglink: Yup.string().required(
    "marry a Manglik is required"
  ),
  profile_will_match_ganna: Yup.string().required("matching Ganna is required"),
  profile_spouse_can_be_older_by: Yup.string().required("OlderBy is required"),
  profile_spouse_can_be_younger_by: Yup.string().required(
    "YoungerBy is required"
  ),
  profile_budget_category_id: Yup.string().required("Budget is required"),
  profile_groom_budget_category_id: Yup.string().required("Groom is required"),
  brief_father_profession: Yup.string().required(
    "Father Profession is required"
  ),
  profile_full_length_photo: Yup.mixed().required("Face Photo is required"),
  profile_full_face_photo_file_name: Yup.mixed().required(
    "Profile Full Photo is required"
  ),
  // payment_amount: Yup.string().required("Payment amount is required."),
  // payment_date: Yup.string().required("Payment date is required."),
  // payment_received: Yup.string().required("Payment Status is required."),
  // payment_reference: Yup.string().required("Payment reference is required."),
  profile_validity_ends: Yup.string().required(
    "Profile validity end date is required."
  ),
});

const NewRegister = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [validity, setValidity] = useState({
    profile_first_name: "",
    profile_gender: "",
    profile_date_of_birth: "",
    profile_time_of_birth: "",
    profile_place_of_birth: "",
    email: "",
    profile_education_qualification: "",
    profile_eduqualification_other: "",
    profile_comunity_name: "",
    profile_gotra: "",
    profile_marry_in_comunity: "",
    profile_height: "",
    profile_height_feet: "",
    profile_height_inches: "",
    profile_father_full_name: "",
    profile_mother_full_name: "",
    profile_profession: "",
    otherProfession: "",
    profile_profession_org_name: "",
    profile_profession_org_type: "",
    profile_profession_others: "",
    profile_physical_disablity: "",
    profile_profession_annual_net_income: "",
    profile_married_brother: "",
    profile_unmarried_brother: "",
    profile_married_sister: "",
    profile_unmarried_sister: "",
    profile_main_contact_full_name: "",
    profile_main_contact_num: "",
    profile_alternate_contact_full_name: "",
    profile_alternate_contact_num: "",
    profile_current_resid_address: "",
    profile_num_of_years_at_this_address: "",
    profile_house_type: "",
    profile_have_married_before: "",
    profile_divorce_status: "",
    profile_children_num_from_prev_marriage: "",
    profile_children_with: "",
    profile_will_marry_in_same_gotra: "",
    profile_will_match_ganna: "",
    profile_is_manglik: "",
    profile_will_marry_manglink: "",
    profile_spouse_can_be_older_by: "",
    profile_spouse_can_be_younger_by: "",
    profile_budget_category_id: "",
    profile_groom_budget_category_id: "",
    profile_bride_permitted_to_work_after_marriage: "",
    profile_place_of_resid_after_marriage: "",
    brief_father_profession: "",
    profile_full_length_photo: "",
    profile_full_face_photo_file_name: "",
    payment_amount: "",
    payment_method: "",
    payment_date: "",
    payment_reference: "",
    payment_received: "",
    profile_validity_ends: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedbudget, setSelectedBudget] = useState([]);
  const [education, setEducation] = useState([]);

  const [heightfeet, setHeightFeet] = useState("");
  const [heightinches, setHeightInches] = useState("");
  const [payment, setPayment] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(heightfeet, heightinches, "feet");
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  // Math.floor(values.profile_height / 12)
  const getValidityData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profileHeight = res.data.user.profile_height || 0;
      const feet = Math.floor(profileHeight / 12);
      const inches = profileHeight % 12;

      setValidity(res.data.user);
      setCommunityId(res.data.user.profile_comunity_name);
      setHeightFeet(feet);
      setHeightInches(inches);
      console.log(res.data.user.profile_comunity_name);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      toast.error("Failed to load user data");
    }
  };
  const getPayment = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-payment-mode`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.paymentMode) {
        setPayment(res.data.paymentMode);
      } else {
        throw new Error("Payment data is missing");
      }
    } catch (error) {
      console.error("Failed to fetch Payment:", error);
      toast.error("Failed to load Payment data");
    }
  };
  const getBudgetData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-budget`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedBudget(res.data.budgt);
    } catch (error) {
      console.error("Failed to fetch education:", error);
      toast.error("Failed to load education data");
    }
  };
  const getEducationdata = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-education`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.education) {
        setEducation(res.data.education);
      } else {
        throw new Error("education data is missing");
      }
    } catch (error) {
      console.error("Failed to fetch education:", error);
      toast.error("Failed to load education data");
    }
  };
  const [community, setCommunity] = useState([]);
  const [gotra, setGotra] = useState([]);
  const [communityId, setCommunityId] = useState(""); // Track the selected community ID
  const [communityName, setCommunityName] = useState(""); // Track the selected community name

  // Fetch community data
  const getCommunity = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-comunity`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.comm) {
        // Assume 'conn' is the value you're comparing with
        const selectedCommunity = res.data.comm.find(
          (item) => item.community_name == communityId // Compare with communityId
        );
        console.log(selectedCommunity, "selectedCommunity");
        if (selectedCommunity) {
          setCommunityName(selectedCommunity.community_name);
          setCommunityId(selectedCommunity.id);
          setCommunity(res.data.comm);
        } else {
          console.error("No community found with the matching 'conn' value");
        }
      } else {
        throw new Error("Community data is missing");
      }
    } catch (error) {
      console.error("Failed to fetch community:", error);
      toast.error("Failed to load community data");
    }
  };

  const getGotra = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/panel-fetch-gotra/${communityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.gotra) {
        setGotra(res.data.gotra);
      } else {
        toast.error("Gotra data is missing");
      }
    } catch (error) {
      console.error("Failed to fetch gotra:", error);
      toast.error("Failed to load gotra data");
    }
  };

  useEffect(() => {
    getCommunity();
  }, [communityId]);

  useEffect(() => {
    if (communityId) {
      getGotra();
    } else {
      console.log("Community ID is missing, skipping fetch.");
    }
  }, [communityId]);

  const handleCommunityChange = (event) => {
    const selectedCommunityName = event.target.value;
    setCommunityName(selectedCommunityName);

    const selectedCommunity = community.find(
      (item) => item.community_name === selectedCommunityName
    );
    if (selectedCommunity) {
      setCommunityId(selectedCommunity.id);
    }

    console.log("Selected Community Name:", selectedCommunityName);
    console.log("Selected Community ID:", selectedCommunity?.id);
  };
  useEffect(() => {
    getCommunity();
    getEducationdata();
    getValidityData();
    getBudgetData();
    getPayment();
  }, [id]);

  // };
  const onSubmit = async (values) => {
    console.log("in");
    setIsButtonDisabled(true);
    const formData = new FormData();

    formData.append("fname", values.profile_first_name || "");
    formData.append("gender", values.profile_gender || "");
    formData.append("dobs", values.profile_date_of_birth || "");
    formData.append("birthtime", values.profile_time_of_birth || "");
    formData.append("placeofBirth", values.profile_place_of_birth || "");
    formData.append("email", values.email || "");
    formData.append(
      "eduqualification",
      values.profile_education_qualification || ""
    );
    formData.append(
      "eduqualification_other",
      values.profile_eduqualification_other || ""
    );
    formData.append("community", communityId || "");
    formData.append("gotra", values.profile_gotra || "");
    formData.append(
      "profile_marry_in_comunity",
      values.profile_marry_in_comunity || ""
    );
    formData.append("heightFeet", heightfeet || "");
    formData.append("heightInch", heightinches || "");
    formData.append("fatherName", values.profile_father_full_name || "");
    formData.append("motherName", values.profile_mother_full_name || "");
    formData.append("businessName", values.profile_profession_org_name || "");
    formData.append("businessType", values.profile_profession_org_type || "");
    formData.append("compName", values.profile_profession_org_name || "");
    formData.append("compType", values.profile_profession_org_type || "");
    formData.append(
      "profile_physical_disablity",
      values.profile_physical_disablity || ""
    );
    formData.append(
      "mainContactName",
      values.profile_main_contact_full_name || ""
    );
    formData.append("mainContactNum", values.profile_main_contact_num || "");
    formData.append("profession", values.profile_profession || "");
    formData.append("otherProfession", values.profile_profession_others || "");

    formData.append(
      "incomeLakh",
      values.profile_profession_annual_net_income || ""
    );
    formData.append("marriedbrother", values.profile_married_brother || "");
    formData.append("unmarriedbrother", values.profile_unmarried_brother || "");
    formData.append("marriedsister", values.profile_married_sister || "");
    formData.append("unmarriedsister", values.profile_unmarried_sister || "");
    formData.append(
      "altContactName",
      values.profile_alternate_contact_full_name || ""
    );
    formData.append("alterCnctNum", values.profile_alternate_contact_num || "");
    formData.append("resAddress", values.profile_current_resid_address || "");
    formData.append(
      "numYraddrs",
      values.profile_num_of_years_at_this_address || ""
    );
    formData.append("ownrent", values.profile_house_type || "");
    formData.append("marriedBfor", values.profile_have_married_before || "");
    formData.append("divorceStatus", values.profile_divorce_status || "");
    formData.append(
      "children",
      values.profile_children_num_from_prev_marriage || ""
    );
    formData.append("childrenWith", values.profile_children_with || "");
    formData.append(
      "sameGothra",
      values.profile_will_marry_in_same_gotra || ""
    );
    formData.append("matchGanna", values.profile_will_match_ganna || "");
    formData.append("isManglik", values.profile_is_manglik || "");
    formData.append("marryManglik", values.profile_will_marry_manglink || "");
    formData.append("olderBy", values.profile_spouse_can_be_older_by || "");
    formData.append("youngerBy", values.profile_spouse_can_be_younger_by || "");
    formData.append("bridebudget", values.profile_budget_category_id || "");
    formData.append(
      "groombudget",
      values.profile_groom_budget_category_id || ""
    );
    formData.append(
      "workAftrMarrige",
      values.profile_bride_permitted_to_work_after_marriage || ""
    );
    formData.append(
      "resaftrMarrige",
      values.profile_place_of_resid_after_marriage || ""
    );
    formData.append(
      "brief_father_profession",
      values.brief_father_profession || ""
    );

    // if (values.fullPhoto) {
    formData.append("fullPhoto", values.profile_full_length_photo);
    // }
    // if (values.facePhoto) {
    formData.append("facePhoto", values.profile_full_face_photo_file_name);
    // }

    formData.append("payment_amount", values.payment_amount || "");
    formData.append("payment_method", values.payment_method || "");
    formData.append("payment_date", values.payment_date || "");
    formData.append(
      "profile_validity_ends",
      values.profile_validity_ends || ""
    );
    formData.append("payment_reference", values.payment_reference || "");
    formData.append("payment_received", values.payment_received || "");
    formData.append("profile_id", id || "");
    console.log("formData", formData);
    try {
      await axios.post(
        `${BASE_URL}/panel-update-new-registration`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("New Register Updated Successfully");
      navigate("/newregister");
    } catch (error) {
      toast.error("Error updating New Register");
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-xs font-semibold text-black mb-1 ">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-red-800";

  const Marrieed = [
    { value: "Yes and Divorced", label: "Yes and Divorced" },
    { value: "Yes and Spouse died", label: "Yes and Spouse died" },
    { value: "No", label: "No" },
  ];
  const Disabled = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];
  const DivorseStatus = [
    { value: "Decree in process", label: "Decree in process" },
    {
      value: "Decree granted less than 6 months back",
      label: " Decree granted less than 6 months back",
    },
    {
      value: "Decree granted less than 2 years back",
      label: "Decree granted less than 2 years back",
    },
    {
      value: "Decree granted less than 5 years back",
      label: "Decree granted less than 5 years back",
    },
    {
      value: "Decree granted more than 5 years back",
      label: "Decree granted more than 5 years back",
    },
  ];

  const ChildrenWith = [
    { value: "Children with", label: "Children with" },
    { value: "All with me", label: "All with me" },
    { value: "All with ex-spouse", label: "All with ex-spouse" },
    { value: "Shared between us", label: "Shared between us" },
  ];
  const paymentStatus = [
    { value: "Pending", label: "Pending" },
    { value: "Received", label: "Received" },
  ];
  const Profession = [
    {
      value: "Employed in Private Sector",
      label: "Employed in Private Sector",
    },
    { value: "Employed in Govt. Sector", label: "Employed in Govt. Sector" },
    { value: "Family Business", label: "Family Business" },
    { value: "Own Business", label: "Own Business" },
    {
      value: "Self Employed(CA,CS,Lawyer..)",
      label: "Self Employed(CA,CS,Lawyer..)",
    },
    {
      value: "Not in a Profession",
      label: "Not in a Profession",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];
  const Community = [
    {
      value: "Agarwal",
      label: "Agarwal",
    },
    { value: "Jain", label: "Jain" },
    { value: "Khandelwal", label: "Khandelwal" },
    { value: "Maheshwari", label: "Maheshwari" },

    {
      value: "Any Community",
      label: "Any of the Above",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];

  const borthersister = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];
  const olderBy = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
  ];

  const inches = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
  ];
  const feet = [
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
  ];
  const BridePermit = [
    { value: "Yes (Business or Service)", label: "Yes (Business or Service)" },
    { value: "Yes (Business only)", label: "Yes (Business only)" },
    {
      value: "Yes (Private Service only)",
      label: "Yes (Private Service only)",
    },
    { value: "Yes (Govt. Service only)", label: "Yes (Govt. Service only)" },
    { value: "No", label: "No" },
    {
      value: "We are flexible to discuss this",
      label: "We are flexible to discuss this",
    },
  ];
  const handleAddYear = (years, setFieldValue, values) => {
    const currentDate = new Date(values.profile_validity_ends || new Date());
    currentDate.setFullYear(currentDate.getFullYear() + years);
    setFieldValue(
      "profile_validity_ends",
      currentDate.toISOString().split("T")[0]
    );
  };

  const convertTo24HourFormat = (time12hr) => {
    const [time, modifier] = time12hr.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = String(Number(hours) + 12);
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}`;
  };
  const convertTo12HourFormat = (time24hr) => {
    let [hours, minutes] = time24hr.split(":");
    let period = "AM";

    hours = parseInt(hours, 10);

    if (hours >= 12) {
      period = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    } else if (hours === 0) {
      hours = 12;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes} ${period}`;
  };

  return (
    <Layout>
      <div className="bg-white p-4 rounded-lg">
        <div className="sticky top-0 p-2 mb-4 border-b-2 border-red-800 bg-red-50 rounded-lg flex">
          <h2 className="px-5 text-black text-lg flex items-center gap-2 p-2">
            <IconArrowBack
              className="w-5 h-5 cursor-pointer"
              onClick={() => navigate("/newregister")}
            />{" "}
            Edit NewRegister
          </h2>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="tabs"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab
              value="contact"
              label={
                <div className="flex items-center">
                  <IconPhone className="mr-2" />
                  Contact
                </div>
              }
            />
            <Tab
              value="payment"
              label={
                <div className="flex items-center">
                  <IconCurrencyRupee />
                  Payment
                </div>
              }
            />
          </Tabs>
          {/* </Box> */}
        </div>
        <Formik
          initialValues={validity}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={onSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            touched,
            errors,
          }) => (
            <Form autoComplete="off" className="w-full  mx-auto  space-y-8">
              <div>
                {activeTab === "contact" && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 ">
                      <div>
                        <FormLabel required>Full Name</FormLabel>
                        <Field
                          type="text"
                          name="profile_first_name"
                          value={values.profile_first_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          maxLength={50}
                        />
                        <ErrorMessage
                          name="profile_first_name"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="w-full">
                        <FormLabel required>Gender</FormLabel>
                        <ButtonGroup className="w-full h-[36px]">
                          <Button
                            className={`${
                              values.profile_gender === "Male"
                                ? "bg-blue-500 shadow-lg shadow-blue-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue("profile_gender", "Male");
                              console.log("Selected Own Rent:", "Own");
                            }}
                          >
                            Male
                          </Button>

                          <Button
                            className={`${
                              values.profile_gender === "Female"
                                ? "bg-pink-500 shadow-lg shadow-red-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue("profile_gender", "Female");

                              console.log("Selected Own Rent:", "Rent");
                            }}
                          >
                            Female
                          </Button>
                        </ButtonGroup>
                        <ErrorMessage
                          name="profile_gender"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <FormLabel required>Date of Birth</FormLabel>
                        <Field
                          type="date"
                          name="profile_date_of_birth"
                          value={values.profile_date_of_birth}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                        />
                        <ErrorMessage
                          name="profile_date_of_birth"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <FormLabel required>Time of Birth</FormLabel>

                        <Field
                          type="time"
                          value={convertTo24HourFormat(
                            values.profile_time_of_birth
                          )}
                          name="profile_time_of_birth"
                          className={inputClass}
                          onChange={(e) => {
                            let value = e.target.value;
                            const formattedValue = convertTo12HourFormat(value);

                            handleChange({
                              target: {
                                name: "profile_time_of_birth",
                                value: formattedValue,
                              },
                            });

                            console.log(
                              formattedValue,
                              "profile_time_of_birth"
                            );
                          }}
                        />
                        <ErrorMessage
                          name="profile_time_of_birth"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <FormLabel required>Place of Birth</FormLabel>
                        <Field
                          type="text"
                          name="profile_place_of_birth"
                          value={values.profile_place_of_birth}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          maxLength={50}
                        />
                        <ErrorMessage
                          name="profile_place_of_birth"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <FormLabel required>Email</FormLabel>
                        <Field
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          maxLength={50}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <SelectInput
                          label="Education"
                          name="profile_education_qualification"
                          options={education.map((item) => ({
                            value: item.education_name,
                            label: item.education_name,
                          }))}
                          value={values.profile_education_qualification}
                          required={true}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          ErrorMessage={ErrorMessage}
                        />
                      </div>

                      {values.profile_education_qualification === "Others" && (
                        <>
                          <div>
                            <FormLabel>Other Education</FormLabel>
                            <Field
                              type="text"
                              name="profile_eduqualification_other"
                              value={values.profile_eduqualification_other}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={inputClass}
                              maxLength={50}
                            />
                          </div>
                        </>
                      )}
                      <div>
                        <SelectInput
                          label="Profession"
                          name="profile_profession"
                          options={Profession}
                          value={values.profile_profession}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          ErrorMessage={ErrorMessage}
                        />
                      </div>
                      {(values.profile_profession ===
                        "Employed in Private Sector" ||
                        values.profile_profession ===
                          "Employed in Govt. Sector") && (
                        <>
                          <div>
                            <FormLabel>Company Name</FormLabel>
                            <Field
                              type="text"
                              name="profile_profession_org_name"
                              value={values.profile_profession_org_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={inputClass}
                              maxLength={50}
                            />
                          </div>
                          <div>
                            <FormLabel>Company Type</FormLabel>
                            <Field
                              type="text"
                              name="profile_profession_org_type"
                              value={values.profile_profession_org_type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={inputClass}
                              maxLength={50}
                            />
                          </div>
                        </>
                      )}
                      {(values.profile_profession === "Family Business" ||
                        values.profile_profession === "Own Business") && (
                        <>
                          <div>
                            <FormLabel>Business Name</FormLabel>
                            <Field
                              type="text"
                              name="profile_profession_org_name"
                              value={values.profile_profession_org_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={inputClass}
                              maxLength={50}
                            />
                          </div>
                          <div>
                            <FormLabel>Business Type</FormLabel>
                            <Field
                              type="text"
                              name="profile_profession_org_type"
                              value={values.profile_profession_org_type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={inputClass}
                              maxLength={50}
                            />
                          </div>
                        </>
                      )}
                      {values.profile_profession === "Others" && (
                        <>
                          <div>
                            <FormLabel>Other Profession</FormLabel>
                            <Field
                              type="text"
                              name="profile_profession_others"
                              value={values.profile_profession_others}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={inputClass}
                              maxLength={50}
                            />
                          </div>
                        </>
                      )}

                      {(values.profile_profession === "Family Business" ||
                        values.profile_profession === "Own Business" ||
                        values.profile_profession ===
                          "Employed in Private Sector" ||
                        values.profile_profession ===
                          "Employed in Govt. Sector" ||
                        values.profile_profession ===
                          "Self Employed(CA,CS,Lawyer..)" ||
                        values.profile_profession === "Others") && (
                        <>
                          <div>
                            <FormLabel>Annual Income (in Lakh)</FormLabel>
                            <Field
                              type="text"
                              as="input"
                              name="profile_profession_annual_net_income"
                              value={
                                values.profile_profession_annual_net_income
                              }
                              maxLength="2"
                              onChange={(e) => {
                                let value = e.target.value;
                                value = value.replace(/[^0-9]/g, "");
                                handleChange({
                                  target: {
                                    name: "profile_profession_annual_net_income",
                                    value,
                                  },
                                });

                                console.log(
                                  value,
                                  "profile_profession_annual_net_income"
                                );
                              }}
                              onBlur={handleBlur}
                              className={inputClass}
                              inputMode="numeric"
                            />
                          </div>
                        </>
                      )}

                      <div>
                        <SelectInput
                          label="My Community"
                          name="profile_comunity_name"
                          options={community.map((item) => ({
                            value: item.community_name,
                            label: item.community_name,
                          }))}
                          value={communityName}
                          required={true}
                          onChange={handleCommunityChange}
                          onBlur={handleBlur}
                          ErrorMessage={ErrorMessage}
                        />
                      </div>

                      <div>
                        <SelectInput
                          label="Gotra"
                          name="profile_gotra"
                          options={gotra.map((item, index) => ({
                            value: item.gotra_name,
                            label: item.gotra_name,
                            key: index + 1,
                          }))}
                          value={values.profile_gotra}
                          required={true}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          ErrorMessage={ErrorMessage}
                        />
                      </div>
                      <div>
                        <SelectInput
                          label="Community Preferences"
                          name="profile_marry_in_comunity"
                          options={Community}
                          value={values.profile_marry_in_comunity}
                          required={true}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          ErrorMessage={ErrorMessage}
                        />
                      </div>
                      <div>
                        <FormLabel required>Height</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="w-full md:w-[5rem]">
                            <SelectInputOne
                              label="Feet"
                              name="profile_height_feet"
                              options={feet}
                              value={heightfeet}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setHeightFeet(newValue);
                                setFieldValue("profile_height_feet", newValue);

                                // Update the form field value
                                handleChange({
                                  target: {
                                    name: "profile_height_feet",
                                    value: newValue,
                                  },
                                });

                                console.log(newValue, "hfett");
                              }}
                              onBlur={handleBlur}
                            />

                            <ErrorMessage
                              name="profile_height_feet"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>

                          <div className="w-full md:w-[5rem]">
                            <SelectInputOne
                              label="Inches"
                              options={inches}
                              name="profile_height_inches"
                              value={heightinches}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setHeightInches(newValue);
                                setFieldValue(
                                  "profile_height_inches",
                                  newValue
                                );
                                handleChange({
                                  target: {
                                    name: "profile_height_inches",
                                    value: newValue,
                                  },
                                });

                                console.log(newValue, "hinches");
                              }}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage
                              name="profile_height_inches"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <FormLabel required>Father's Name </FormLabel>
                        <Field
                          type="text"
                          name="profile_father_full_name"
                          value={values.profile_father_full_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          maxLength={50}
                        />
                        <ErrorMessage
                          name="profile_father_full_name"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <FormLabel required>Mother's Name </FormLabel>
                        <Field
                          type="text"
                          name="profile_mother_full_name"
                          value={values.profile_mother_full_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          maxLength={50}
                        />
                        <ErrorMessage
                          name="profile_mother_full_name"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <FormLabel required>Brother's </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className=" w-full md:w-[5rem]">
                            <SelectInputOne
                              label="Married"
                              name="profile_married_brother"
                              options={borthersister}
                              value={values.profile_married_brother}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              ErrorMessage={ErrorMessage}
                            />
                          </div>
                          <div className=" w-full md:w-[5rem]">
                            <SelectInputOne
                              label="Un-M"
                              name="profile_unmarried_brother"
                              options={borthersister}
                              value={values.profile_unmarried_brother}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              ErrorMessage={ErrorMessage}
                            />
                          </div>
                        </div>
                      </div>
                      {/* //sister */}
                      <div>
                        <FormLabel required>Sister's </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className=" w-full md:w-[5rem]">
                            <SelectInputOne
                              label="Married"
                              name="profile_married_sister"
                              options={borthersister}
                              value={values.profile_married_sister}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              ErrorMessage={ErrorMessage}
                            />
                          </div>
                          <div className=" w-full md:w-[5rem]">
                            <SelectInputOne
                              label="Un-M"
                              name="profile_unmarried_sister"
                              options={borthersister}
                              value={values.profile_unmarried_sister}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              ErrorMessage={ErrorMessage}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <FormLabel required>Main Contact Name </FormLabel>
                        <Field
                          type="text"
                          name="profile_main_contact_full_name"
                          value={values.profile_main_contact_full_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          maxLength={50}
                        />
                      </div>
                      <div>
                        <FormLabel>Main Contact Mobile</FormLabel>
                        <Field
                          type="text"
                          as="input"
                          maxLength="10"
                          name="profile_altprofile_main_contact_numernate_contact_num"
                          value={values.profile_main_contact_num}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            handleChange({
                              target: {
                                name: "profile_main_contact_num",
                                value,
                              },
                            });

                            console.log(value, "main cn");
                          }}
                          onBlur={handleBlur}
                          className={inputClass}
                          inputMode="numeric"
                        />
                      </div>
                      <div>
                        <FormLabel>Alternate Contact Name</FormLabel>
                        <Field
                          type="text"
                          name="profile_alternate_contact_full_name"
                          value={values.profile_alternate_contact_full_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          maxLength={50}
                        />
                      </div>
                      <div>
                        <FormLabel>Alternate Contact Number</FormLabel>
                        <Field
                          type="text"
                          as="input"
                          maxLength="10"
                          name="profile_alternate_contact_num"
                          value={values.profile_alternate_contact_num}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            handleChange({
                              target: {
                                name: "profile_alternate_contact_num",
                                value,
                              },
                            });

                            console.log(value, "main cn");
                          }}
                          onBlur={handleBlur}
                          className={inputClass}
                          inputMode="numeric"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <FormLabel required>
                          Current Residential Address (Candidate)
                        </FormLabel>
                        <Field
                          as="textarea"
                          name="profile_current_resid_address"
                          value={values.profile_current_resid_address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${inputClass} resize-none overflow-y-auto`} // resize-y will allow vertical resizing
                          rows="2"
                          maxLength={500}
                        />
                        <ErrorMessage
                          name="profile_current_resid_address"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <FormLabel required>No Years at the address</FormLabel>
                        <Field
                          type="text"
                          as="input"
                          name="profile_num_of_years_at_this_address"
                          value={values.profile_num_of_years_at_this_address}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            handleChange({
                              target: {
                                name: "profile_num_of_years_at_this_address",
                                value,
                              },
                            });

                            console.log(value, "main cn");
                          }}
                          onBlur={handleBlur}
                          className={inputClass}
                          inputMode="numeric"
                          maxLength={2}
                        />
                        <ErrorMessage
                          name="profile_num_of_years_at_this_address"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="w-full">
                        <FormLabel required>House</FormLabel>
                        <ButtonGroup className="w-full h-[36px]">
                          <Button
                            className={`${
                              values.profile_house_type === "Own"
                                ? "bg-blue-500 shadow-lg shadow-blue-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue("profile_house_type", "Own");
                              console.log("Selected Own Rent:", "Own");
                            }}
                          >
                            Own
                          </Button>

                          <Button
                            className={`${
                              values.profile_house_type === "Rent"
                                ? "bg-pink-500 shadow-lg shadow-red-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue("profile_house_type", "Rent");

                              console.log("Selected Own Rent:", "Rent");
                            }}
                          >
                            Rent
                          </Button>
                        </ButtonGroup>
                        <ErrorMessage
                          name="profile_house_type"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <SelectInput
                          label="Physical Disablity (if any)"
                          name="profile_physical_disablity"
                          options={Disabled}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.profile_physical_disablity}
                          ErrorMessage={ErrorMessage}
                          required={true}
                        />
                      </div>
                      <div>
                        <SelectInput
                          label="Have you married before?"
                          name="profile_have_married_before"
                          options={Marrieed}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.profile_have_married_before}
                          ErrorMessage={ErrorMessage}
                          required={true}
                        />
                      </div>
                      {values.profile_have_married_before ==
                        "Yes and Divorced" && (
                        <>
                          <div>
                            <SelectInput
                              label="Divorce Status"
                              name="profile_divorce_status"
                              options={DivorseStatus}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.profile_divorce_status}
                              ErrorMessage={ErrorMessage}
                            />
                          </div>
                        </>
                      )}
                      {values.profile_have_married_before ==
                        "Yes and Spouse died" && (
                        <>
                          <div>
                            <FormLabel>Children from Prior Marriage</FormLabel>
                            <Field
                              type="text"
                              as="input"
                              name="profile_children_num_from_prev_marriage"
                              value={
                                values.profile_children_num_from_prev_marriage
                              }
                              maxLength="1"
                              onChange={(e) => {
                                let value = e.target.value;
                                value = value.replace(/[^0-9]/g, "");
                                handleChange({
                                  target: {
                                    name: "profile_children_num_from_prev_marriage",
                                    value,
                                  },
                                });

                                console.log(
                                  value,
                                  "profile_children_num_from_prev_marriage"
                                );
                              }}
                              onBlur={handleBlur}
                              className={inputClass}
                              inputMode="numeric"
                            />
                          </div>
                        </>
                      )}
                      {values.profile_children_num_from_prev_marriage >= 1 && (
                        <>
                          <div>
                            <SelectInput
                              label="Children With"
                              name="profile_children_with"
                              options={ChildrenWith}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.profile_children_with}
                              ErrorMessage={ErrorMessage}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mt-4">
                      PARTNER PREFERENCES
                    </h3>
                    <hr></hr>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
                      <div className="w-full">
                        <FormLabel required>
                          Will you marry in same Gotra?
                        </FormLabel>
                        <ButtonGroup className="w-full h-[36px]">
                          <Button
                            className={`${
                              values.profile_will_marry_in_same_gotra === "Yes"
                                ? "bg-blue-500 shadow-lg shadow-blue-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue(
                                "profile_will_marry_in_same_gotra",
                                "Yes"
                              );
                              console.log("Selected Own Yes:", "Yes");
                            }}
                          >
                            Yes
                          </Button>

                          <Button
                            className={`${
                              values.profile_will_marry_in_same_gotra === "No"
                                ? "bg-pink-500 shadow-lg shadow-red-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue(
                                "profile_will_marry_in_same_gotra",
                                "No"
                              );

                              console.log("Selected Own No:", "No");
                            }}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                        <ErrorMessage
                          name="profile_will_marry_in_same_gotra"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div className="w-full">
                        <FormLabel required>
                          Will you be matching Ganna (Janampatri)?{" "}
                        </FormLabel>
                        <ButtonGroup className="w-full h-[36px]">
                          <Button
                            className={`${
                              values.profile_will_match_ganna === "Yes"
                                ? "bg-blue-500 shadow-lg shadow-blue-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue("profile_will_match_ganna", "Yes");
                              console.log("Selected Own Yes:", "Yes");
                            }}
                          >
                            Yes
                          </Button>

                          <Button
                            className={`${
                              values.profile_will_match_ganna === "No"
                                ? "bg-pink-500 shadow-lg shadow-red-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue("profile_will_match_ganna", "No");

                              console.log("Selected Own No:", "No");
                            }}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                        <ErrorMessage
                          name="profile_will_match_ganna"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="w-full">
                        <FormLabel required>Are you Manglik?</FormLabel>
                        <ButtonGroup className="w-full h-[36px]">
                          <Button
                            className={`${
                              values.profile_is_manglik === "Yes"
                                ? "bg-blue-500 shadow-lg shadow-blue-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue("profile_is_manglik", "Yes");
                              console.log("Selected Own Yes:", "Yes");
                            }}
                          >
                            Yes
                          </Button>

                          <Button
                            className={`${
                              values.profile_is_manglik === "No"
                                ? "bg-pink-500 shadow-lg shadow-red-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue("profile_is_manglik", "No");

                              console.log("Selected Own No:", "No");
                            }}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                        <ErrorMessage
                          name="profile_is_manglik"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="w-full">
                        <FormLabel required>
                          Will you marry a Manglik?
                        </FormLabel>
                        <ButtonGroup className="w-full h-[36px]">
                          <Button
                            className={`${
                              values.profile_will_marry_manglink === "Yes"
                                ? "bg-blue-500 shadow-lg shadow-blue-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue(
                                "profile_will_marry_manglink",
                                "Yes"
                              );
                              console.log("Selected Own Yes:", "Yes");
                            }}
                          >
                            Yes
                          </Button>

                          <Button
                            className={`${
                              values.profile_will_marry_manglink === "No"
                                ? "bg-pink-500 shadow-lg shadow-red-500"
                                : "bg-gray-500"
                            } text-white w-full`}
                            onClick={() => {
                              setFieldValue(
                                "profile_will_marry_manglink",
                                "No"
                              );

                              console.log("Selected Own No:", "No");
                            }}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                        <ErrorMessage
                          name="profile_will_marry_manglink"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div>
                        <FormLabel required>
                          Prospective Spouse can be (in years)?
                        </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:w-[5rem]">
                            <SelectInputOne
                              label="OlderBy"
                              name="profile_spouse_can_be_older_by"
                              options={olderBy}
                              value={values.profile_spouse_can_be_older_by}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              ErrorMessage={ErrorMessage}
                            />
                          </div>
                          <div className="md:w-[5rem]">
                            <SelectInputOne
                              label="YoungerBy"
                              name="profile_spouse_can_be_younger_by"
                              options={olderBy}
                              value={values.profile_spouse_can_be_younger_by}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              ErrorMessage={ErrorMessage}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <FormLabel required>
                          Expected Budget (In Lakhs){" "}
                        </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:w-[5rem]">
                            <SelectInputOne
                              label="Bridge"
                              name="profile_budget_category_id"
                              options={selectedbudget.map((item) => ({
                                value: item.id,
                                label: item.ranges,
                              }))}
                              value={values.profile_budget_category_id}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              ErrorMessage={ErrorMessage}
                            />
                          </div>
                          <div className="md:w-[5rem]">
                            <SelectInputOne
                              label="Groom"
                              name="profile_groom_budget_category_id"
                              options={selectedbudget.map((item) => ({
                                value: item.id,
                                label: item.ranges,
                              }))}
                              value={values.profile_groom_budget_category_id}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              ErrorMessage={ErrorMessage}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <SelectInput
                          label="Bride permitted to work after marriage?"
                          name="profile_bride_permitted_to_work_after_marriage"
                          options={BridePermit}
                          value={
                            values.profile_bride_permitted_to_work_after_marriage
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          ErrorMessage={ErrorMessage}
                        />
                      </div>
                      <div>
                        <FormLabel>Place of residence after marriage</FormLabel>
                        <Field
                          type="text"
                          name="profile_place_of_resid_after_marriage"
                          value={values.profile_place_of_resid_after_marriage}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          maxLength={50}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 p-2   gap-6">
                      <div>
                        <FormLabel required>
                          Brief Summary of Parent’s Occupation / Family History
                        </FormLabel>
                        <Field
                          as="textarea"
                          name="brief_father_profession"
                          value={values.brief_father_profession}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${inputClass} resize-none overflow-y-auto`} // resize-y will allow vertical resizing
                          rows="2"
                          maxLength={500}
                        />
                        <ErrorMessage
                          name="brief_father_profession"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <FormLabel required>Full Length Photograph</FormLabel>
                        <input
                          type="file"
                          name="profile_full_length_photo"
                          onChange={(event) => {
                            if (
                              event.currentTarget.files &&
                              event.currentTarget.files[0]
                            ) {
                              setFieldValue(
                                "profile_full_length_photo",
                                event.currentTarget.files[0]
                              );
                            }
                          }}
                          onBlur={handleBlur}
                          className={inputClass}
                        />
                        <ErrorMessage
                          name="profile_full_length_photo"
                          component="div"
                          className="text-red-500 text-xs"
                        />

                        {values.profile_full_length_photo && (
                          <div className="text-xs text-red-400">
                            Selected file:{" "}
                            {values.profile_full_length_photo.name ||
                              values.profile_full_length_photo}
                          </div>
                        )}
                      </div>

                      <div>
                        <FormLabel required>Full Face Photograph</FormLabel>
                        <input
                          type="file"
                          name="profile_full_face_photo_file_name"
                          onChange={(event) => {
                            if (
                              event.currentTarget.files &&
                              event.currentTarget.files[0]
                            ) {
                              setFieldValue(
                                "profile_full_face_photo_file_name",
                                event.currentTarget.files[0]
                              );
                            }
                          }}
                          onBlur={handleBlur}
                          className={inputClass}
                        />
                        <ErrorMessage
                          name="profile_full_face_photo_file_name"
                          component="div"
                          className="text-red-500 text-xs"
                        />

                        {values.profile_full_face_photo_file_name && (
                          <div className="text-xs text-red-400">
                            Selected file:{" "}
                            {values.profile_full_face_photo_file_name.name ||
                              values.profile_full_face_photo_file_name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "payment" && (
                  <div className="lg:col-span-9">
                    <div className="grid grid-cols-1 p-2   gap-6">
                      <div>
                        <FormLabel>Payment Amount</FormLabel>
                        <Field
                          type="text"
                          as="input"
                          name="payment_amount"
                          value={values.payment_amount}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            handleChange({
                              target: {
                                name: "payment_amount",
                                value,
                              },
                            });
                            console.log(value);
                          }}
                          onBlur={handleBlur}
                          className={inputClass}
                          inputMode="numeric"
                          maxLength={10}
                        />
                      </div>
                      <div>
                        <SelectInput
                          label="Payment Method"
                          name="payment_method"
                          options={payment.map((item) => ({
                            value: item.payment_mode,
                            label: item.payment_mode,
                          }))}
                          value={values.payment_method}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <SelectInput
                          label="Payment Status"
                          name="payment_received"
                          options={paymentStatus}
                          value={values.payment_received}
                          // required={true}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div>
                        <FormLabel>Payment Reference</FormLabel>
                        <Field
                          type="text"
                          name="payment_reference"
                          value={values.payment_reference}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          maxLength={50}
                        />
                      </div>
                      <div>
                        <FormLabel>Payment Date</FormLabel>
                        <Field
                          type="date"
                          name="payment_date"
                          value={values.payment_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <FormLabel required> Validity Date</FormLabel>
                        <div className="flex justify-between items-center space-x-2">
                          <IconButton
                            type="button"
                            onClick={() =>
                              handleAddYear(1, setFieldValue, values)
                            }
                          >
                            1
                          </IconButton>

                          <Field
                            type="date"
                            name="profile_validity_ends
"
                            value={values.profile_validity_ends}
                            onChange={(e) => {
                              let value = e.target.value;
                              handleChange({
                                target: {
                                  name: "profile_validity_ends",
                                  value,
                                },
                              });
                              console.log(value, "amount");
                            }}
                            onBlur={handleBlur}
                            className={inputClass}
                          />
                          <ErrorMessage
                            name="profile_validity_ends"
                            component="div"
                            className="text-red-500 text-xs"
                          />

                          <IconButton
                            type="button"
                            onClick={() =>
                              handleAddYear(2, setFieldValue, values)
                            }
                          >
                            2
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-4">
                <Button
                  className="w-36 text-white bg-blue-600"
                  type="submit"
                  disabled={isButtonDisabled}
                  onClick={() => console.log("click")}
                >
                  {isButtonDisabled ? "Updating..." : "Update"}
                </Button>

                <Button
                  className="w-36 text-white bg-red-600"
                  onClick={() => navigate("/newregister")}
                >
                  Back
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="  bg-gradient-to-r from-red-100 via-pink-50 to-red-50/10 text-white px-3 py-1">
    {icon && <div>{icon}</div>}
    <div>
      <p className="text-sm text-gray-800 ">{label}</p>
      <p className="text-gray-900 text-md font-[700]">
        {value || "Not Provided"}
      </p>
    </div>
  </div>
);

export default NewRegister;
