import React from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";

import { User } from "app/redux/types";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { onGetRepos } from "app/redux/globalSlice";
import {
  RepoDesc,
  RepoItemContainer,
  RepoStar,
  StyledAccordion,
} from "./styles";
import { countFormatter } from "app/utils";

type AccordionCardProps = {
  item: User;
};

const AccordionCard = (props: AccordionCardProps) => {
  const dispatch = useAppDispatch();
  const repos = useAppSelector((state) => state.globalStore.repos);
  const { item } = props;

  return (
    <StyledAccordion
      data-testid="accordion-component"
      onChange={(e, expanded) => expanded && dispatch(onGetRepos(item.login))}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="span">{item.login}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {repos.map((i) => (
          <RepoItemContainer key={i.id} data-testid="accordion-item">
            <RepoDesc>
              <Typography variant="h6" fontWeight={600}>
                {i.full_name.replace(`${item.login}/`, "")}
              </Typography>
              <RepoStar>
                <StarIcon />
                <Typography variant="body1">
                  {countFormatter(i.stargazers_count)}
                </Typography>
              </RepoStar>
            </RepoDesc>

            <Typography variant="body1">{i.description}</Typography>
          </RepoItemContainer>
        ))}
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default AccordionCard;
