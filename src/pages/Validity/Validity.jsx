import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { Tooltip } from "@mantine/core";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from "mantine-react-table";
import { Box, Button, Center, Flex, Loader, Text } from "@mantine/core";
import { IconEdit, IconEye, IconRadioactive } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ImagePath, NoImagePath } from "../../base/BaseUrl";
import ProfileImageCell from "../../components/common/ProfileImageCell";
const Validity = () => {
  const [female, setFemale] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fetchMarriedData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/panel-fetch-validity-expire`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedData = (response.data?.user || []).map((item, index) => ({
        ...item,
        id: item.id ? String(item.id) : `generated-${index}`,
      }));
      setFemale(updatedData || []);
      // setFemale(response.data?.user || []);
    } catch (error) {
      console.error("Error fetching template data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarriedData();
  }, []);
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
          <Flex gap="xs">
            <Tooltip label="View" position="top" withArrow>
              <IconEye
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => {
                  navigate(`/validity/view/${row.original.id}`);
                }}
              />
            </Tooltip>
            <Tooltip label="Edit" position="top" withArrow>
              <IconEdit
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => {
                  navigate(`/validity/edit/${row.original.id}`);
                }}
              />
            </Tooltip>
          </Flex>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: female,
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
            Validity
          </Text>
          <Flex gap="sm">
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
        </Flex>
      );
    },
  });

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
    </Layout>
  );
};

export default Validity;
