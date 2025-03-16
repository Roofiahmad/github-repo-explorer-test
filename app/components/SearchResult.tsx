import * as React from "react";
import AccordionCard from "./AccordionCard";
import styled from "styled-components";
import { User } from "app/redux/types";

const SearchResultContainer = styled.div`
  width: 100%;
`;

type Props = {
  items?: User[];
};

export default function SearchResult({ items }: Props) {
  return (
    <SearchResultContainer>
      {items?.map((i) => (
        <AccordionCard item={i} key={i.id} />
      ))}
    </SearchResultContainer>
  );
}
