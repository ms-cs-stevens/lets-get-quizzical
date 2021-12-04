import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { Column, Row } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useApexInfoStyles } from "@mui-treasury/styles/info/apex";
import QuizCharts from "./QuizCharts.jsx";

const useStyles = makeStyles(() => ({
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "1rem",
    boxShadow: "0 6px 20px 0 #dbdbe8",
    backgroundColor: "#fff",
    transition: "0.4s",
    height: "100%",
  },
}));

const CustomCard = ({
  thumbnail,
  title,
  subtitle,
  description,
  bottomText,
}) => {
  const classes = useStyles();
  return (
    <Column className={classes.card}>
      <Row p={2} gap={2}>
        <Avatar variant={"rounded"} src={thumbnail} />
        <Info position={"middle"} useStyles={useApexInfoStyles}>
          <InfoTitle>{title}</InfoTitle>
          <InfoSubtitle>{subtitle}</InfoSubtitle>
        </Info>
      </Row>
      <Row pb={3} px={2}>
        {description}
      </Row>
      <Row p={1} gap={1} position={"bottom"}>
        {bottomText}
      </Row>
    </Column>
  );
};

const Card = () => {
  return (
    <>
      <CustomCard
        joined
        title={"Performance"}
        description={
          <>
            <QuizCharts />
          </>
        }
      />
    </>
  );
};
export default Card;
