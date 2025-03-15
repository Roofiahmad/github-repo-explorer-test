"use client";

import React, { useState } from "react";
import SearchResult from "app/components/SearchResult";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { onGetUsers, setUsers } from "app/redux/globalSlice";

import dynamic from "next/dynamic";

const InputStyled = dynamic(() => import("app/components/InputStyled"), {
  ssr: false,
});

const Button = dynamic(() => import("@mui/material/Button"), {
  ssr: false,
});

const StyledButton = styled(Button)`
  width: 100%;
  text-transform: capitalize;
  background-color: rgba(25, 118, 210, 0.8);
  margin-top: 16px;
`;

interface FormElements extends HTMLFormControlsCollection {
  userName: HTMLInputElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function Home() {
  const dispatch = useAppDispatch();
  const { users, userTotalCount } = useAppSelector(
    (state) => state.globalStore
  );
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState<"false" | "true">("false");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("false");
  };

  const handleSubmit = (e: React.FormEvent<UsernameFormElement>) => {
    e.preventDefault();
    const userName = e.currentTarget.elements.userName.value;
    if (userName.trim() === "") {
      dispatch(setUsers({ items: [], totalCount: null }));
      return setError("true");
    }
    dispatch(onGetUsers(userName));
    setKeyword(userName);
  };

  const generateTextResult = (
    userLength: number,
    totalCount: number | null
  ) => {
    if (userLength && totalCount) return `Showing users for "${keyword}"`;
    if (!userLength && totalCount == 0)
      return `No result found for user"${keyword}"`;
    return "";
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
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <InputStyled
          onChange={handleOnChange}
          placeholder="Enter username"
          errorMessage="username can't be empty"
          error={error}
          name="userName"
        />
        <StyledButton variant="contained" size="large" type="submit">
          Search
        </StyledButton>
      </form>

      <Typography variant="body1" marginBottom={"16px"} marginTop={"16px"}>
        {generateTextResult(users.length, userTotalCount)}
      </Typography>

      <SearchResult items={users} />
    </div>
  );
}

export default Home;
