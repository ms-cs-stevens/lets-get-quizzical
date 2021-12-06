import { Typography } from "@mui/material";
import React from "react";
import Chart from "react-google-charts";

const QuizCharts = ({ quizData, category, chartType, x, y }) => {
  const categoryLabel = category.replace("-", " ").toUpperCase();

  const formatDate = (d) => {
    const date = new Date(d);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const formatQuizData = (category) => {
    const data = [];
    data.push(["Date", categoryLabel]);

    if (quizData.length) {
      const sortedQuizzes = quizData.sort((a, b) =>
        a.startTime < b.startTime ? 1 : -1
      );

      sortedQuizzes.forEach((quiz) => {
        if (quiz.category === category) {
          data.push([formatDate(quiz.startTime), quiz.score]);
        }
      });
    }
    return data;
  };

  return (
    <>
      {Object.keys(formatQuizData(category)).length >= 2 ? (
        <Chart
          width={850}
          height={600}
          chartType={chartType}
          loader={<div>Loading Chart</div>}
          data={formatQuizData(category)}
          options={{
            title: `Performance in ${categoryLabel}`,
            hAxis: { title: x, titleTextStyle: { color: "#333" } },
            vAxis: {
              title: y,
              titleTextStyle: { color: "#333" },
              minValue: 0,
              maxValue: 40,
            },
          }}
        />
      ) : (
        <Typography variant="p" component="p">
          You need to take quizzes for this category to see {chartType} here!
        </Typography>
      )}
    </>
  );
};

export default QuizCharts;
