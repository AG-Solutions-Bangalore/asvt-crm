import {
    Box,
    Button,
    Center,
    Flex,
    Loader,
    Text,
    Tooltip,
} from "@mantine/core";
import {
    IconCircleX
} from "@tabler/icons-react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
    MantineReactTable,
    MRT_GlobalFilterTextInput,
    MRT_ToggleFiltersButton,
    useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import BASE_URL, { NoImagePath } from "../../base/BaseUrl";
import descriptionData from "../../json/emailjson.json";
import Layout from "../../layout/Layout";

import { Checkbox } from "@material-tailwind/react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@mui/material";
import { IconPhoto } from "@tabler/icons-react";
import toast from "react-hot-toast";
import ProfileImageCell from "../../components/common/ProfileImageCell";
const validationSchemaEmail = Yup.object({
  description_message: Yup.string().required("Description is Required"),
});
const NoImage = () => {
  const [noimage, setNoImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [emailCheckDialog, setEmailCheckDialog] = useState(false);
  const [isButtonDisabledEmail, setIsButtonDisabledEmail] = useState(false);
  const [openNoImageDialog, setOpenNoImageDialog] = useState(false);
  const [noimageId, setNoImageId] = useState(null);
  const [emailCheck, setEmailCheck] = useState({
    user_data: [],
    description_message: descriptionData?.description,
  });
  const handleCheckBoxChange = (e, id) => {
    setEmailCheck((prev) => {
      const updatedUserData = e.target.checked
        ? [...prev.user_data, id]
        : prev.user_data.filter((item) => item !== id);
      return { ...prev, user_data: updatedUserData };
    });
  };
  const navigate = useNavigate();
  const fetchNoImageData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/panel-fetch-no-image`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNoImage(response.data?.user || []);
    } catch (error) {
      console.error("Error fetching template data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNoImageData();
  }, []);

  const handleNoImageDialog = (id) => {
    setNoImageId(id);
    setOpenNoImageDialog(true);
  };
  const handleCloseNoImageDialog = () => {
    setNoImageId(null);
    setOpenNoImageDialog(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "noimage",
        header: "Profile Photo",
        size: 150,
        Cell: ({ row }) => {
          return <ProfileImageCell imageUrl={NoImagePath} alt="No Profile" />;
        },
      },
      {
        accessorKey: "id",
        header: "Profile Id",
        size: 50,
        Cell: ({ row }) => {
          return <span>{row.original.id || ""}</span>;
        },
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
      {
        accessorKey: "profile_main_contact_num",
        header: "Mobile Number",
        size: 50,
      },
      {
        accessorKey: "profile_gotra",
        header: "Gotra",
      },
      {
        accessorKey: "profile_place_of_birth",
        header: "Place of Birth",
        size: 50,
      },
      {
        id: "id",
        header: "Action",
        size: 50,
        enableHiding: false,
        Cell: ({ row }) => (
          <Flex gap="xs" className="items-center">
            <Tooltip label="Whatsapp" position="top" withArrow>
              <Checkbox
                className="w-4 h-4"
                color="blue"
                key={row.original.id}
                checked={emailCheck.user_data.includes(row.original.id)}
                onChange={(e) => handleCheckBoxChange(e, row.original.id)}
              />
            </Tooltip>
            <Tooltip label="No Image" position="top" withArrow>
              <IconPhoto
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => handleNoImageDialog(row.original.id)}
              />
            </Tooltip>
          </Flex>
        ),
      },
    ],
    [emailCheck]
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
            No Image
          </Text>
          <Flex gap="sm">
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />

            <Button
              className="w-36 text-white bg-blue-600 hover:bg-violet-400 hover:animate-pulse"
              onClick={() => setEmailCheckDialog(true)}
              disabled={emailCheck.user_data.length === 0}
            >
              Send Mail
            </Button>
          </Flex>
        </Flex>
      );
    },
  });
  const onSubmitEmail = async (values) => {
    const token = localStorage.getItem("token");
    const data = {
      user_data: emailCheck.user_data.join(","),
      description_message: values.description_message,
    };

    try {
      setIsButtonDisabledEmail(true);
      const response = await axios.post(
        `${BASE_URL}/panel-send-mail-to-user`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code == 200) {
        toast.success(response.data.msg);
        setEmailCheckDialog(false);
        setEmailCheck({
          user_data: [],
          description_message: descriptionData?.description,
        });
      } else if (response.data.code == 400) {
        toast.error(response.data.msg);
      } else {
        toast.error("Failed to Send Mail");
      }
    } catch (error) {
      toast.error("Failed to Send Mail");
      console.error(error);
    } finally {
      setIsButtonDisabledEmail(false);
    }
  };
  const onNoImageSubmit = async () => {
    setIsButtonDisabled(true);
    const token = localStorage.getItem("token");
    try {
      const respose = await axios.put(
        `${BASE_URL}/panel-update-activation-no-image/${noimageId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (respose.data.code === 200) {
        toast.success(respose.data.msg || "Profile is Activated");
        handleCloseNoImageDialog();
        fetchNoImageData();
      } else {
        toast.error(respose.data.msg || "Profile is Activated");
      }
    } catch (error) {
      toast.error(error.message || "Error on  Activated");
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

      <Dialog
        open={emailCheckDialog}
        onClose={() => setEmailCheckDialog(false)}
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
          initialValues={emailCheck}
          validationSchema={validationSchemaEmail}
          enableReinitialize
          onSubmit={(values, actions) => {
            actions.resetForm();
          }}
        >
          {({ values, handleChange, handleBlur }) => {
            return (
              <Form
                autoComplete="off"
                className="w-full max-w-7xl mx-auto space-y-8"
              >
                <div className="p-6 space-y-1 sm:w-[280px] md:w-[500px] bg-white rounded-2xl shadow-md">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h1 className="text-slate-800 text-xl font-semibold">
                        Email Send
                      </h1>

                      <div
                        className="flex"
                        onClick={() => setEmailCheckDialog(false)}
                      >
                        <Tooltip label="Close" position="top" withArrow>
                          <button type="button" className="ml-3 pl-2">
                            <IconCircleX />
                          </button>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="mt-2 p-4">
                      <div className="grid grid-cols-1 p-2 gap-6">
                        <div>
                          <FormLabel required>Description Message</FormLabel>
                          <Field
                            name="description_message"
                            value={values.description_message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            as="textarea"
                            className={`${inputClass} resize-y`}
                            rows="6"
                          />

                          <ErrorMessage
                            name="description_message"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center">
                        <Button
                          className="w-36 text-white bg-blue-600 mx-4"
                          type="button"
                          disabled={isButtonDisabledEmail}
                          onClick={() => onSubmitEmail(values)}
                        >
                          {isButtonDisabledEmail
                            ? "Submitting..."
                            : "Send Mail"}
                        </Button>
                        <Button
                          className="w-36 text-white bg-red-600"
                          type="button"
                          onClick={() => setEmailCheckDialog(false)}
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

      <Dialog
        open={openNoImageDialog}
        onClose={handleNoImageDialog}
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
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            my: "10px",
          }}
        >
          No Image
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: "15px",
              my: "10px",
            }}
          >
            Do you want to Update?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-red-600 hover:bg-red-400 p-2 rounded-lg shadow-md mr-2"
            onClick={handleCloseNoImageDialog}
          >
            <span>No</span>
          </button>
          <button
            className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md mr-2"
            onClick={onNoImageSubmit}
            disabled={isButtonDisabled}
          >
            {/* <span>Confirm</span> */}
            {isButtonDisabled ? "...Updating" : "Yes"}
          </button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default NoImage;
