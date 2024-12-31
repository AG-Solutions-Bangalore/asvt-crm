import React from "react";
import Layout from "../layout/Layout";
import logo from "../assets/receipt/ag_small.png";
export const Testing1 = () => {
  return (
    <Layout>
      <div>
        <div className="bg-white p-6">
          {/* //FirstRow */}
          <div className="grid grid-cols-3 gap-3 border-b-4 border-brown-600">
            <div>
              <img
                src={logo}
                alt="Profile"
                className="h-10 w-20 md:h-20 md:w-20 p-2"
              />
            </div>
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-bold text-brown-500">
                AGARWAL SAMAJ VIKAS TRUST
              </h1>
            </div>
            <div className="flex justify-end">
              <img
                src={logo}
                alt="Profile"
                className="h-10 w-20 md:h-20 md:w-20 p-2"
              />
            </div>
          </div>
          {/* //second row */}
          <div className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-9">
              <div className="border p-1 bg-blue-50">
                <h1 className="text-xl font-bold text-brown-500">
                  DURGESH BANSAL <span className="ml-3">(Bansak)</span>
                </h1>
              </div>

              <div className="space-y-3">
                <div className="flex text-blue-500 font-normal gap-2 border-b mt-2">
                  <span>Qualification</span>
                  <span>:30</span>
                </div>
                <div className="flex text-blue-500 font-normal gap-2 border-b ">
                  <span>Profession</span>
                  <span>:25</span>
                </div>
                <div className="flex text-blue-500 font-normal gap-2 border-b ">
                  <span>Business/Company Name</span>
                  <span>35</span>
                </div>
                <div className="flex text-blue-500 font-normal gap-2 border-b">
                  <span>Business/Company Type</span>
                  <span>35</span>
                </div>
                <div className="flex text-blue-500 font-normal gap-2 border-b ">
                  <span>Annual Net Income</span>
                  <span>35</span>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="border p-1 bg-blue-gray-900 text-center">
                <h1 className="text-xl font-bold text-white">SL No :1668 </h1>
              </div>
              <div className="space-y-4">
                <div className="flex text-blue-500 font-semibold gap-2">
                  <span>D.O.B:</span>
                  <span>28-11-2001</span>
                </div>
                <div className="flex text-blue-500 font-semibold gap-2">
                  <span>T.O.B:</span>
                  <span>01.45AM</span>
                </div>
                <div className="flex text-blue-500 font-semibold gap-2">
                  <span>Place:</span>
                  <span>Banglore</span>
                </div>
                <div className="flex text-blue-500 font-semibold gap-2">
                  <span>Height:</span>
                  <span>5 ft 9 inches</span>
                </div>
                <div className="flex text-blue-500 font-semibold gap-2">
                  <span>Email:</span>
                  <span className="text-sm">man@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* //thired row */}
          <div className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-9">
              <div className="border p-1 bg-blue-50">
                <div className="grid grid-cols-2 gap-2">
                  <h1 className="text-xl font-bold text-brown-500">
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
                  <div className="col-span-9 space-y-3">
                    <div className="flex text-blue-500 font-normal gap-2 border-b mt-2">
                      <span>Father's Name</span>
                      <span>:30</span>
                    </div>
                    <div className="flex text-blue-500 font-normal gap-2 border-b ">
                      <span>Mother's Name</span>
                      <span>:25</span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="flex text-blue-500 font-normal gap-2  mt-2 space-x-5">
                      <span>Brother's</span>
                      <span>3</span>
                      <span className="">1</span>
                    </div>
                    <div className="flex text-blue-500 font-normal gap-2  mt-2 space-x-5">
                      <span>Sister's</span>
                      <span>5</span>
                      <span>2</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 ">
                  <div className="flex text-blue-500 font-normal gap-2 border-b ">
                    <span>Main Contact </span>
                    <span>3737888873737</span>
                  </div>
                  <div className=" text-blue-500 font-normal gap-2 border-b text-center">
                    <span>No </span>
                    <span>:1234567898</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 ">
                  <div className="flex text-blue-500 font-normal gap-2 border-b ">
                    <span>Alternate</span>
                    <span>: 3737373737</span>
                  </div>
                  <div className=" text-blue-500 font-normal gap-2 border-b text-center">
                    <span>No </span>
                    <span>:1234567898</span>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-9 border-b">
                    <div className=" text-blue-500 font-normal gap-2  text-start ">
                      <span>CHitor -AP </span>
                    </div>
                  </div>

                  <div className="col-span-3">
                    {" "}
                    <div className="flex justify-between">
                      <div className=" text-blue-500 font-medium   text-center ">
                        <span className="border-b font-normal">Rented/Own</span>
                        <div className=" text-blue-500  border-b text-center mt-1 font-normal">
                          <span>Rent</span>
                        </div>
                      </div>
                      <div className=" text-blue-500 font-normal   text-center ">
                        <span className="border-b">Years</span>
                        <div className=" text-blue-500 font-normal border-b text-center mt-1">
                          <span>8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3"></div>
          </div>

          {/* //fourth */}
          <div className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-9">
              <div className="border p-1 bg-blue-50">
                <h1 className="text-xl font-bold text-brown-500">
                  PARTNER PREFERENECE
                </h1>
              </div>

              <div>
                <div className="grid grid-cols-12 mt-2 text-blue-500 font-normal">
                  <div className="col-span-9 text-start space-y-2">
                    <span className="block border-b border-gray-300">
                      Are You Based on Banglore?
                    </span>
                    <span className="block border-b border-gray-300">
                      Place Your residence after marriage (City/State)
                    </span>
                    <span className="block border-b border-gray-300">
                      Will you be matching Ganna (Janampatri)?
                    </span>
                    <span className="block border-b border-gray-300">
                      Will you marry in the same Gotra?
                    </span>
                    <span className="block border-b border-gray-300">
                      Are you Manglik?
                    </span>
                    <span className="block border-b border-gray-300">
                      Will you marry a Manglik?
                    </span>
                    <span className="block border-b border-gray-300">
                      Prospective Spouse can be:
                    </span>
                    <span className="block border-b border-gray-300 h-[25px]">
                      {" "}
                    </span>
                    <span className="block border-b border-gray-300">
                      Bride will be permitted to work after marriage.
                    </span>
                    <span className="block border-b border-gray-300">
                      Contact/Reference with Address in Banglore:
                    </span>
                    <span className="block border-b border-gray-300">
                      Expected Budget from Bride:
                    </span>
                    <span className="block border-b border-gray-300">
                      Expected Budget from Groom:
                    </span>
                    <span className="block">Information (if any):</span>
                  </div>
                  <div className="col-span-3 text-start space-y-2">
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block border-b border-gray-300">:445</span>
                    <span className="block "></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
