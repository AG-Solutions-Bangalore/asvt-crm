const validationSchema = Yup.object({
  //new

  profile_first_name: Yup.string().required("Full Name is required"),
  profile_gender: Yup.string().required("Gender is required"),
  profile_date_of_birth: Yup.string().required("Date of Birth is required"),
  profile_time_of_birth: Yup.string().required("Time of Birth is required"),
  profile_place_of_birth: Yup.string().required("Place of Birth is required"),
  email: Yup.string().required("email  is required"),
  profile_education_catogery: Yup.string().required("Education  is required"),
  profile_comunity_name: Yup.string().required("Community  is required"),
  profile_gotra: Yup.string().required("Gotra  is required"),
  profile_marry_in_comunity: Yup.string().required(
    "Community Preferences  is required"
  ),
  profile_height_feet: Yup.string().required("Feet is required"),
  profile_height_inches: Yup.string().required("Inches is required"),
  profile_father_full_name: Yup.string().required("Father Name is required"),
  profile_mother_full_name: Yup.string().required("Mother Name is required"),
  profile_profession: Yup.string().required("profession is required"),
  profile_profession_org_name: Yup.string().required(
    "Organization Name is required"
  ),
  profile_profession_org_type: Yup.string().required(
    "Organization Type is required"
  ),
  profile_profession_others: Yup.string().required(
    "Profession  Others is required"
  ),
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
});