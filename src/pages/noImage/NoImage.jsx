import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Loader,
  Select,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCircleX, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import {
  MantineReactTable,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import BASE_URL, { ImagePath, NoImagePath } from "../../base/BaseUrl";
import Layout from "../../layout/Layout";

import { Dialog, Slide } from "@mui/material";
import { IconBrandWhatsapp, IconPhotoX } from "@tabler/icons-react";
import toast from "react-hot-toast";
import NoImageDialog from "../../components/common/NoImageDialog";
import ProfileImageCell from "../../components/common/ProfileImageCell";
const validationSchemaUpdateImage = Yup.object({
  profile_id: Yup.string().required("Profile  is required"),
  facePhoto: Yup.mixed().required("Face Photo is required"),
  fullPhoto: Yup.mixed().required("Profile Full Photo is required"),
});
const NoImage = () => {
  const [whatsappdata, setWhatsappData] = useState([]);
  const [noimage, setNoImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [openNoImageDialog, setOpenNoImageDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [noimageId, setNoImageId] = useState(null);
  const [selectedWhatsappType, setSelectedWhatssappType] = useState(null);
  const [imageData, setImageData] = useState({
    profile_id: "",
    fullPhoto: "",
    facePhoto: "",
  });


  const fetchWhatsappData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/panel-fetch-message`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const formatted = response.data.data.map((item) => ({
        value: item.message_heading,
        label: item.message_heading,
        message_description: item.message_description, 
      }));

      setWhatsappData(formatted);
      setWhatsappData(formatted || []);
    } catch (error) {
      console.error("Error fetching template data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchNoImageData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/panel-fetch-no-image`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedData = (response.data?.user || []).map((item, index) => ({
        ...item,
        id: item.id ? String(item.id) : `generated-${index}`,
      }));
      setNoImage(updatedData || []);
    } catch (error) {
      console.error("Error fetching template data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNoImageData();
    fetchWhatsappData();
  }, []);

  const handleImageDialog = (id) => {
    setNoImageId(id);
    setImageData((prev) => ({
      ...prev,
      profile_id: id,
    }));
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setNoImageId(null);
    setOpenImageDialog(false);
    setImageData({
      profile_id: "",
      fullPhoto: "",
      facePhoto: "",
    });
  };
  const handleNoImageDialog = (id) => {
    setNoImageId(id);
    setOpenNoImageDialog(true);
  };
  const handleCloseNoImageDialog = () => {
    setNoImageId(null);
    setOpenNoImageDialog(false);
  };

  const handleOpenWhatsApp = (phoneNumber) => {
    console.log(phoneNumber)
    if (!selectedWhatsappType) {
      toast.error("Please select a WhatsApp message type first.");
      return;
    }

    if (!phoneNumber) {
      toast.error("Phone number is missing or invalid.");
      return;
    }

    const cleanedPhone = phoneNumber.replace(/\D/g, "").replace(/^91/, "");

    const selected = whatsappdata.find(
      (item) => item.value === selectedWhatsappType
    );

    if (!selected || !selected.message_description) {
      toast.error("Message content not found for selected type.");
      return;
    }

    const encodedMessage = encodeURIComponent(selected.message_description);
    const url = `https://wa.me/91${cleanedPhone}?text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  const RandomValue = Date.now();
  const columns = useMemo(
    () => [
      {
        accessorKey: "profile_full_face_photo_file_name",
        header: "Profile Photo",
        size: 150,
        Cell: ({ row }) => {
          const profilePhoto = row.original.profile_full_face_photo_file_name;
          const imagePath = profilePhoto
            ? `${ImagePath}${profilePhoto}?t=${RandomValue}`
            : NoImagePath;
          return (
            <ProfileImageCell
              imageUrl={imagePath}
              alt={profilePhoto ? "Profile" : "No Profile"}
            />
          );
        },
      },
      {
        accessorKey: "id",
        header: "Profile Id",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "profile_gender",
        header: "Gender",
        size: 50,
      },
      {
        accessorKey: "profile_father_full_name",
        header: "Father Name",
        size: 50,
      },
      // {
      //   accessorKey: "profile_main_contact_num",
      //   header: "Mobile Number",
      //   size: 50,
      // },
      // {
      //   accessorKey: "profile_gotra",
      //   header: "Gotra",
      // },
      // {
      //   accessorKey: "profile_place_of_birth",
      //   header: "Place of Birth",
      //   size: 50,
      // },
      {
        id: "actions",
        header: "Action",
        size: 50,
        enableHiding: false,
        Cell: ({ row }) => (
          <Flex gap="xs" className="items-center">
            <Tooltip label="Send WhatsApp" position="top" withArrow>
        

              <ActionIcon
                variant="transparent"
                color="green"
                onClick={() => {
                  if (selectedWhatsappType) {
                    handleOpenWhatsApp(row.original.profile_main_contact_num);
                  }
                }}
                disabled={
                  selectedWhatsappType === "" || selectedWhatsappType === null
                }
              >
                <IconBrandWhatsapp
                  className={`${
                    selectedWhatsappType
                      ? "text-green-600 hover:text-green-800"
                      : "text-gray-300"
                  }`}
                />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="No Image" position="top" withArrow>
              <IconPhotoX
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => handleNoImageDialog(row.original.id)}
              />
            </Tooltip>
            <Tooltip label="Image Upload" position="top" withArrow>
              <IconEdit
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => handleImageDialog(row.original.id)}
              />
            </Tooltip>
          </Flex>
        ),
      },
    ],
    [selectedWhatsappType]
  );

  const table = useMantineReactTable({
    columns,
    data: noimage,
    enableColumnActions: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    initialState: { showGlobalFilter: true },
    mantineTableContainerProps: { sx: { maxHeight: "400px" } },

    renderTopToolbar: ({ table }) => {
      return (
        <Flex
          p="md"
          justify="space-between"
          sx={{
            overflowX: "auto",
            maxWidth: "100%",
          }}
          // flexWrap="wrap"
        >
          {" "}
          <Text size="xl" weight={700}>
            No Images
          </Text>
          <Flex gap="sm">
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />

            <Select
              placeholder="Select whatsapp type"
              data={whatsappdata}
              value={selectedWhatsappType}
              onChange={(value) => {
                setSelectedWhatssappType(value);
              }}
              withinPortal
              clearable
              className="w-48"
            />
          </Flex>
        </Flex>
      );
    },
  });
  const onUpdateImage = async (values) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profile_id", values.profile_id);
    formData.append("fullPhoto", values.fullPhoto);
    formData.append("facePhoto", values.facePhoto);
    try {
      setIsButtonDisabled(true);
      const response = await axios.post(
        `${BASE_URL}/panel-update-no-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code == 200) {
        toast.success(response.data.msg || "Image Updated Sucessfully");
        handleCloseImageDialog();
        fetchNoImageData();
      } else if (response.data.code == 400) {
        toast.error(response.data.msg);
      } else {
        toast.error(response.data.msg || "Failed to upload Image");
      }
    } catch (error) {
      toast.error(error.message || "Failed to upload Image");
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-300 border-red-200";

  return (
    <Layout>
      <Box className="max-w-screen">
        {isLoading ? (
          <Center style={{ height: "70vh", flexDirection: "column" }}>
            <Loader size="lg" variant="bars" color="red" />
            <Text mt="md" color="gray" size="lg">
              Loading, please wait...
            </Text>
          </Center>
        ) : (
          <MantineReactTable table={table} />
        )}
      </Box>

      {/* //image upoload */}
      <Dialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{
          backdropFilter: "blur(5px) sepia(5%)",
          "& .MuiDialog-paper": {
            borderRadius: "18px",
          },
        }}
        TransitionComponent={Slide}
        transitionDuration={500}
      >
        {" "}
        <Formik
          initialValues={imageData}
          validationSchema={validationSchemaUpdateImage}
          enableReinitialize
          onSubmit={(values, actions) => {
            onUpdateImage(values);
            actions.resetForm();
          }}
        >
          {({ values, handleBlur, setFieldValue }) => {
            return (
              <Form
                autoComplete="off"
                className="w-full max-w-7xl mx-auto space-y-8"
              >
                <div className="p-6 space-y-1 sm:w-[280px] md:w-[500px] bg-white rounded-2xl shadow-md">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h1 className="text-slate-800 text-xl font-semibold">
                        Update Images
                      </h1>

                      <div className="flex" onClick={handleCloseImageDialog}>
                        <Tooltip label="Close" position="top" withArrow>
                          <button type="button" className="ml-3 pl-2">
                            <IconCircleX />
                          </button>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="mt-2 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <FormLabel required>Full Length Photograph</FormLabel>
                          <input
                            type="file"
                            name="fullPhoto"
                            onChange={(event) => {
                              if (
                                event.currentTarget.files &&
                                event.currentTarget.files[0]
                              ) {
                                setFieldValue(
                                  "fullPhoto",
                                  event.currentTarget.files[0]
                                );
                              }
                            }}
                            onBlur={handleBlur}
                            className={inputClass}
                          />
                          <ErrorMessage
                            name="fullPhoto"
                            component="div"
                            className="text-red-500 text-xs"
                          />

                          {values.fullPhoto && (
                            <div className="text-xs text-red-400">
                              Selected file:{" "}
                              {values.fullPhoto.name || values.fullPhoto}
                            </div>
                          )}
                        </div>

                        <div>
                          <FormLabel required>Full Face Photograph</FormLabel>
                          <input
                            type="file"
                            name="facePhoto"
                            onChange={(event) => {
                              if (
                                event.currentTarget.files &&
                                event.currentTarget.files[0]
                              ) {
                                setFieldValue(
                                  "facePhoto",
                                  event.currentTarget.files[0]
                                );
                              }
                            }}
                            onBlur={handleBlur}
                            className={inputClass}
                          />
                          <ErrorMessage
                            name="facePhoto"
                            component="div"
                            className="text-red-500 text-xs"
                          />

                          {values.facePhoto && (
                            <div className="text-xs text-red-400">
                              Selected file:{" "}
                              {values.facePhoto.name || values.facePhoto}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center">
                        <Button
                          className="w-36 text-white bg-blue-600 mx-4"
                          type="submit"
                          disabled={isButtonDisabled}
                        >
                          {isButtonDisabled ? "Update..." : "Update Image"}
                        </Button>
                        <Button
                          className="w-36 text-white bg-red-600"
                          type="button"
                        >
                          Cancel{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
      <NoImageDialog
        open={openNoImageDialog}
        onClose={handleCloseNoImageDialog}
        refetch={fetchNoImageData}
        noimageId={noimageId}
      />
    </Layout>
  );
};

export default NoImage;
