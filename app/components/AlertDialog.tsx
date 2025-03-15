"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { globalSlice } from "app/redux/globalSlice";
import { DialogTitle } from "@mui/material";

export default function AlertDialog() {
  const { isError, errorMessage, errorCode } = useAppSelector(
    (state) => state.globalStore
  );

  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(
      globalSlice.actions.setErrorMessage({
        isError: false,
        errorMessage: "",
        errorCode: null,
      })
    );
  };

  return (
    <>
      <Dialog color="error" open={isError} onClose={handleClose}>
        <DialogTitle>Error {errorCode}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
