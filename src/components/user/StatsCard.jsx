import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Column, Row } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useApexInfoStyles } from "@mui-treasury/styles/info/apex";
import QuizCharts from "./QuizCharts.jsx";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Grid } from "@material-ui/core";

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

const Card = ({ quizData }) => {
  const [category, setCategory] = useState("country-capitals");
  const categories = [
    {
      value: "country-capitals",
      label: "Country capitals",
    },
    {
      value: "mathematics",
      label: "Mathematics",
    },
    {
      value: "antonyms",
      label: "Antonyms",
    },
    {
      value: "solar-system",
      label: "Solar System",
    },
  ];

  const handleClick = (e, category) => {
    setCategory(category);
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        style={{
          position: "absolute",
          zIndex: 100,
          marginTop: 20,
          marginLeft: "30%",
        }}
      >
        {categories.map((category) => (
          <Chip
            label={category.label}
            onClick={(e) => handleClick(e, category.value)}
          />
        ))}
      </Stack>
      <CustomCard
        joined
        title={"Performance Analytics"}
        description={
          <>
            <Grid container>
              <Grid item xs={12}>
                <QuizCharts
                  quizData={quizData}
                  category={category}
                  chartType={"AreaChart"}
                />
              </Grid>
              <Grid item xs={12}>
                <QuizCharts
                  quizData={quizData}
                  category={category}
                  chartType={"ColumnChart"}
                />
              </Grid>
            </Grid>
          </>
        }
      />
    </>
  );
};
export default Card;
