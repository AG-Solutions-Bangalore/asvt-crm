import { IconPrinter } from "@tabler/icons-react";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/receipt/ag_small.png";
import view from "../../assets/receipt/download.png";
import BASE_URL, { ImagePath, NoImagePath } from "../../base/BaseUrl";
import Layout from "../../layout/Layout";

export const ViewValidity = () => {
  const printRef = useRef(null);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [groom, setGroom] = useState({});
  const [bride, setBride] = useState({});
  const getTemplateData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data?.user) {
        setData(res.data.user);
      } else {
        throw new Error("User data is missing");
      }
      setGroom(res.data.groom);
      setBride(res.data.bride);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      toast.error("Failed to load user data");
    }
  };
  useEffect(() => {
    getTemplateData();
  }, [id]);
  const handlePrintPdf = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "View",
    pageStyle: `
    @page {
      size: A4 portrait;
    margin: 0mm;
    }
    @media print {
      body {
        font-size: 10px;
        margin: 0mm;
        padding: 0mm;
      }
      table {
        font-size: 12px;
      }
      .print-hide {
        display: none;
      }
    }
  `,
  });

  const feet = Math.floor(data.profile_height / 12);
  const inches = data.profile_height % 12;
  const RandomValue = Date.now();

  const imagePath = data.profile_full_face_photo_file_name
    ? `${ImagePath}${data.profile_full_face_photo_file_name}?t=${RandomValue}`
    : NoImagePath;
  const imagePath1 = data.profile_full_length_photo
    ? `${ImagePath}${data.profile_full_length_photo}?t=${RandomValue}`
    : NoImagePath;
  return (
    <Layout>
      <div className="text-black flex justify-end mb-4">
        <button
          variant="text"
          className="print-none flex items-center  bg-white bg-opacity-50 hover:bg-opacity-70 rounded px-4 py-2 shadow-lg hover:shadow-xl transition-shadow"
          onClick={handlePrintPdf}
        >
          <IconPrinter className="text-lg" />
          <span className="text-lg font-semibold">Print</span>
        </button>
      </div>
      <div
        ref={printRef}
        className="w-full shadow-2xl rounded-xl print:shadow-none print:rounded-none overflow-hidden text-[12px] "
      >
        <div className="bg-white p-6">
          {/* //FirstRow */}
          <div className="grid grid-cols-3 gap-3 border-b-4 border-brown-600">
            <div>
              <img src={logo} alt="Profile" className="h-20 w-20 p-2" />
            </div>
            <div className="flex justify-center items-center w-full">
              <h1 className="font-bold text-brown-500">
                AGARWAL SAMAJ VIKAS TRUST
              </h1>
            </div>
            <div className="flex justify-end">
              <img src={logo} alt="Profile" className=" w-20 h-20  p-2" />
            </div>
          </div>
          {/* //second row */}
          <div className="grid grid-cols-12 gap-2 mt-2 print:grid-cols-12 print:gap-2">
            <div className="col-span-9 print:col-span-9">
              <div className="border p-1 bg-blue-50">
                <h1 className="font-bold text-brown-500">
                  DURGESH BANSAL <span className="ml-3">(Bansak)</span>
                </h1>
              </div>

              <div className="space-y-3 relative">
                {(data.profile_divorce_status == "Yes and Divorced" ||
                  data.profile_divorce_status == "Yes and Spouse died") && (
                  <div
                    style={{
                      backgroundImage: `url(${view})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "100px",
                      width: "150px",
                      position: "absolute",
                      right: "30px",
                      top: "0",
                    }}
                  ></div>
                )}
                <div className="flex text-blue-500 font-normal gap-2 border-b mt-2">
                  <span>Qualification</span>:
                  <span>{data.profile_education_qualification}</span>
                </div>
                <div className="flex text-blue-500 font-normal gap-2 border-b ">
                  <span>Profession</span>:<span>{data.profile_profession}</span>
                </div>
                <div className="flex text-blue-500 font-normal gap-2 border-b ">
                  <span>Business/Company Name</span>
                  <span>{data.profile_profession_org_name}</span>
                </div>
                <div className="flex text-blue-500 font-normal gap-2 border-b">
                  <span>Business/Company Type</span>
                  <span>{data.profile_profession_org_type}</span>
                </div>
                <div className="flex text-blue-500 font-normal gap-2 border-b ">
                  <span>Annual Net Income</span>
                  <span>{data.profile_profession_annual_net_income}</span>
                </div>
              </div>

              <div className="col-span-9">
                <div className="border p-1 bg-blue-50">
                  <div className="grid grid-cols-2 gap-2">
                    <h1 className="text-md font-bold text-brown-500">
                      About Family <span className="ml-3">-</span>
                      <span className="ml-3">Any Community</span>
                    </h1>
                    <div className="flex justify-end gap-4 items-end">
                      <div className="text-xs text-blue-400">Married</div>
                      <div className="text-xs text-blue-400">UnMarried</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-6">
                    {/* <!-- Left Section --> */}
                    <div className="col-span-8 space-y-3">
                      <div className="grid grid-cols-2 text-blue-500 font-normal border-b mt-2">
                        <span>Father's Name</span>
                        <span>
                          :
                          <span className="ml-1">
                            {data.profile_father_full_name}
                          </span>
                        </span>{" "}
                      </div>
                      <div className="grid grid-cols-2 text-blue-500 font-normal border-b">
                        <span>Mother's Name</span>
                        <span>
                          :
                          <span className="ml-1">
                            {data.profile_mother_full_name}
                          </span>
                        </span>{" "}
                      </div>
                    </div>
                    {/* 
  <!-- Right Section --> */}
                    <div className="col-span-4 space-y-3">
                      <div className="grid grid-cols-3 text-blue-500 font-normal mt-2 gap-4">
                        <span>Brother's</span>
                        <span className="flex justify-end items-end">
                          <span>{data.profile_married_brother}</span>
                        </span>

                        <span className="flex justify-center items-end">
                          <span>{data.profile_unmarried_brother}</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-3 text-blue-500 font-normal mt-2 gap-4">
                        <span>Sister's</span>
                        <span className="flex justify-end items-end">
                          <span>{data.profile_married_sister}</span>
                        </span>
                        <span className="flex justify-center items-end">
                          <span>{data.profile_unmarried_sister}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 ">
                    <div className="flex text-blue-500 font-normal gap-2 border-b ">
                      <span>Main Contact </span>:
                      <span>{data.profile_main_contact_full_name}</span>
                    </div>
                    <div className=" text-blue-500 font-normal gap-2 border-b text-center">
                      <span>No </span>:
                      <span>{data.profile_main_contact_num}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 ">
                    <div className="flex text-blue-500 font-normal gap-2 border-b ">
                      <span>Alternate</span>:
                      <span>{data.profile_alternate_contact_full_name}</span>
                    </div>
                    <div className=" text-blue-500 font-normal gap-2 border-b text-center">
                      <span>No </span>:
                      <span>{data.profile_alternate_contact_num}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="col-span-9 border-b">
                      <div className=" text-blue-500 font-normal gap-2  text-start ">
                        <span>{data.profile_current_resid_address}</span>
                      </div>
                    </div>

                    <div className="col-span-3">
                      {" "}
                      <div className="flex justify-between">
                        <div className=" text-blue-500 font-medium   text-center ">
                          <span className="border-b font-normal">
                            Rented/Own
                          </span>
                          <div className=" text-blue-500  border-b text-center mt-1 font-normal">
                            <span>{data.profile_house_type}</span>{" "}
                          </div>
                        </div>
                        <div className=" text-blue-500 font-normal   text-center ">
                          <span className="border-b">Years</span>
                          <div className=" text-blue-500 font-normal border-b text-center mt-1">
                            <span>
                              {data.profile_num_of_years_at_this_address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-9">
                  <div className="border p-1 bg-blue-50">
                    <h1 className="text-md  font-bold text-brown-500">
                      PARTNER PREFERENECE
                    </h1>
                  </div>

                  <div>
                    <div className="mt-2 text-blue-500 font-normal">
                      <div className=" text-start space-y-2">
                        <div className="grid grid-cols-2 border-b">
                          <span className="block border-gray-300">
                            Place Your residence after marriage (City/State)
                          </span>

                          <span className="block border-gray-300  mt-[0.23rem]">
                            {data.profile_place_of_resid_after_marriage}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 border-b">
                          <span className="block border-gray-300">
                            Will you be matching Ganna (Janampatri)?
                          </span>

                          <span className="block border-gray-300  mt-[0.23rem]">
                            {data.profile_will_match_ganna}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 border-b">
                          <span className="block border-gray-300">
                            Will you marry in the same Gotra?
                          </span>

                          <span className="block border-gray-300  mt-[0.23rem]">
                            {data.profile_will_marry_in_same_gotra}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 border-b">
                          <span className="block border-gray-300">
                            Are you Manglik?
                          </span>

                          <span className="block border-gray-300  mt-[0.23rem]">
                            {data.profile_will_marry_manglink}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 border-b">
                          <span className="block border-gray-300">
                            Prospective Spouse can be:
                          </span>

                          <span className="block border-gray-300  mt-[0.23rem]">
                            Older by - {data.profile_spouse_can_be_older_by} Yrs
                          </span>
                        </div>
                        <div className="grid grid-cols-2 border-b">
                          <span className="block border-gray-300 h-[21px]"></span>

                          <span className="block border-gray-300  mt-[0.23rem]">
                            Younger by -{data.profile_spouse_can_be_younger_by}{" "}
                            Yrs
                          </span>
                        </div>
                        <div className="grid grid-cols-2 border-b">
                          <span className="block border-gray-300">
                            Bride will be permitted to work after marriage.
                          </span>

                          <span className="block border-gray-300  mt-[0.23rem]">
                            {
                              data.profile_bride_permitted_to_work_after_marriage
                            }
                          </span>
                        </div>
                        <div className="grid grid-cols-2 border-b">
                          <span className="block border-gray-300">
                            Expected Budget from Bride:
                          </span>

                          <span className="block border-gray-300  mt-[0.23rem]">
                            {bride.ranges}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 border-b">
                          <span className="block border-gray-300">
                            Expected Budget from Groom:
                          </span>

                          <span className="block border-gray-300  mt-[0.23rem]">
                            {groom.ranges}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 border-b">
                          <span className="block border-gray-300">
                            Information (if an )
                          </span>

                          <span className="block border-gray-300  mt-[0.23rem]">
                            {data.brief_father_profession}
                          </span>
                        </div>
                        {data.profile_have_married_before ==
                          "Yes and Divorced" && (
                          <div className="grid grid-cols-2 border-b">
                            <span className="block border-gray-300">
                              Divourse Status
                            </span>
                            <span className="block border-gray-300  mt-[0.23rem]">
                              {data.profile_divorce_status}
                            </span>
                          </div>
                        )}
                        {data.profile_have_married_before ==
                          "Yes and Spouse died" && (
                          <>
                            <div className="grid grid-cols-2 border-b">
                              <span className="block border-gray-300">
                                Children From Prior Marriage
                              </span>
                              <span className="block border-gray-300  mt-[0.23rem]">
                                {data.profile_children_num_from_prev_marriage}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 border-b">
                              <span className="block border-gray-300">
                                Children With
                              </span>
                              <span className="block border-gray-300  mt-[0.23rem]">
                                {data.profile_children_with}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 print:col-span-3 space-y-4">
              <div className="border p-1 bg-blue-gray-900">
                <h1 className="font-bold text-white">SL No :{id}</h1>
              </div>
              <div className="space-y-4">
                <div className="flex text-blue-500 font-semibold gap-2">
                  <span>D.O.B:</span>
                  <span>
                    {moment(data.profile_date_of_birth).format("DD-MMM-YYYY")}
                  </span>
                </div>
                <div className="flex text-blue-500 font-semibold gap-2">
                  <span>T.O.B:</span>
                  <span>{data.profile_time_of_birth}</span>
                </div>
                <div className="flex text-blue-500 font-semibold gap-2">
                  <span>Place:</span>
                  <span>{data.profile_place_of_birth}</span>
                </div>
                <div className="flex text-blue-500 font-semibold gap-2">
                  <span>Height:</span>
                  <span>{feet}</span>ft
                  <span>{inches}</span>inches
                </div>
                <div className="flex text-blue-500 font-semibold">
                  <span>Email:</span>
                  <span className="break-words">{data.email}</span>
                </div>
              </div>
              <div>
                <img
                  src={imagePath1}
                  className="w-[15rem] h-[25rem] rounded-md"
                />
              </div>
              <div>
                <img
                  src={imagePath}
                  className="w-[15rem] h-[15rem] rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ViewValidity;
