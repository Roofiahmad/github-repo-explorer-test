"use client";

import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "lib/hooks";
import React from "react";

const Loading = () => {
  const loading = useAppSelector((state) => state.globalStore.loading);
  return (
    <Backdrop
      sx={(theme) => ({
        color: "#FFFFFF",
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "rgba(255, 255, 255, 0.3) ",
      })}
      open={loading}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Loading;
