"use client";

import React, { useState } from "react";
import SearchResult from "app/components/SearchResult";
import Button from "@mui/material/Button";
import InputStyled from "app/components/InputStyled";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { onGetUsers } from "app/redux/globalSlice";

const StyledButton = styled(Button)`
  width: 100%;
  text-transform: capitalize;
  background-color: rgba(25, 118, 210, 0.8);
`;

function Home() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.globalStore.users);
  const [keyword, setKeyword] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(() => e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "520px",
        margin: "auto",
        padding: "32px",
      }}
    >
      <InputStyled onChange={handleOnChange} />
      <StyledButton
        onClick={() => dispatch(onGetUsers(keyword))}
        variant="contained"
        size="large"
      >
        Search
      </StyledButton>

      {users.length ? (
        <Typography variant="body1" marginBottom={"16px"} marginTop={"16px"}>
          Showing users for "{keyword}"
        </Typography>
      ) : null}

      <SearchResult items={users} />
    </div>
  );
}

export default Home;
