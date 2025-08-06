import {
  Box,
  Button,
  Center,
  Flex,
  Loader,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import axios from "axios";
import {
  MantineReactTable,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  useMantineReactTable,
} from "mantine-react-table";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL, { NoImagePath, NotificationPath } from "../../base/BaseUrl";
import ProfileImageCell from "../../components/common/ProfileImageCell";
import Layout from "../../layout/Layout";
const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const fetchNotification = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/panel-fetch-notification-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedData = (response.data?.notification || []).map(
        (item, index) => ({
          ...item,
          id: item.id ? String(item.id) : `generated-${index}`, // fallback id if missing
        })
      );
      setNotification(updatedData || []);
      // setNotification(response.data?.notification || []);
    } catch (error) {
      console.error("Error fetching template data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);
  const RandomValue = Date.now();

  const columns = useMemo(
    () => [
      {
        accessorKey: "notification_image",
        header: "Profile Photo",
        size: 150,
        Cell: ({ row }) => {
          const profilePhoto = row.original.notification_image;
          const imagePath = profilePhoto
            ? `${NotificationPath}${profilePhoto}?t=${RandomValue}`
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
        accessorKey: "notification_date",
        header: "Notification Date",
        size: 50,
        Cell: ({ row }) => {
          const image = moment(row.original.notification_date).format(
            "DD-MM-YYYY"
          );
          return image;
        },
      },
      {
        accessorKey: "notification_heading",
        header: "Notification Heading",
        size: 150,
      },

      {
        accessorKey: "notification_status",
        header: "Status",
        size: 50,
      },

      {
        id: "actions",
        header: "Action",
        size: 50,
        enableHiding: false,
        Cell: ({ row }) => (
          <Flex gap="xs">
            <Tooltip label="Edit" position="top" withArrow>
              <IconEdit
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => {
                  navigate(`/notification/edit/${row.original.id}`);
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
    data: notification,
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
            Notification
          </Text>
          <Flex gap="sm">
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />

            <Button
              className="w-36 text-white bg-blue-600 !important hover:bg-violet-400 hover:animate-pulse"
              onClick={() => {
                navigate("/notification/add");
              }}
            >
              Add
            </Button>
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

export default Notification;
