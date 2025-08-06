import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
const NoImageDialog = ({
  open,
  onClose,
  noimageId,
  refetch,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const Submit = async () => {
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
        onClose();
        refetch();
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
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
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
            onClick={onClose}
          >
            <span>No</span>
          </button>
          <button
            className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md mr-2"
            onClick={Submit}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? "...Updating" : "Yes"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NoImageDialog;
