import * as React from "react";
import AccordionCard from "./AccordionCard";
import styled from "styled-components";
import { User } from "app/redux/types";

const SearchContainer = styled.div`
  width: 100%;
`;

type Props = {
  items?: User[];
};

export default function SearchResult(props: Props) {
  return (
    <SearchContainer>
      {props.items?.map((i) => (
        <AccordionCard item={i} key={i.id} />
      ))}
    </SearchContainer>
  );
}
