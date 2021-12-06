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
import {WHITE_COLOR, categoryList} from '../../variables/constant';

const useStyles = makeStyles(() => ({
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "1rem",
    boxShadow: "0 6px 20px 0 #dbdbe8",
    backgroundColor: WHITE_COLOR,
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
        {Object.entries(categoryList).map(([key, label]) => (
          <Chip
            label={label}
            onClick={(e) => handleClick(e, key)}
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
                  x={"Date"}
                  y={"Score"}
                />
              </Grid>
              <Grid item xs={12}>
                <QuizCharts
                  quizData={quizData}
                  category={category}
                  chartType={"BarChart"}
                  x={"Score"}
                  y={"Date"}
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
