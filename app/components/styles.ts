import { Accordion } from "@mui/material";
import styled from "styled-components";

export const StyledAccordion = styled(Accordion)`
  border: none;
  margin-bottom: 16px;

  h3.MuiAccordion-heading button {
    background-color: #eeeeee;
  }
`;

export const RepoItemContainer = styled.div`
  display: flex;
  background-color: #dddddd;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 8px;
  flex-direction: column;
`;

export const RepoDesc = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const RepoStar = styled.div`
  display: flex;
  align-items: start;
  gap: 4px;
`;
