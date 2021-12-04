import React from "react";
import Chart from "react-google-charts";

const QuizCharts = ({ quizData, category, chartType }) => {
  const categoryLabel = category.replace("-", " ").toUpperCase();

  const formatDate = (d) => {
    const date = new Date(d);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const formatQuizData = (category) => {
    const data = [];
    data.push(["Date", categoryLabel]);

    const sortedQuizzes = quizData.sort((a, b) =>
      a.startTime < b.startTime ? 1 : -1
    );

    sortedQuizzes.forEach((quiz) => {
      if (quiz.category === category) {
        data.push([formatDate(quiz.startTime), quiz.score]);
      }
    });
    return data;
  };

  return (
    <>
      <Chart
        width={850}
        height={600}
        chartType={chartType}
        loader={<div>Loading Chart</div>}
        data={formatQuizData(category)}
        options={{
          title: `Performance in ${categoryLabel}`,
          hAxis: { title: "Score", titleTextStyle: { color: "#333" } },
          vAxis: {
            title: "Date",
            titleTextStyle: { color: "#333" },
            minValue: 0,
            maxValue: 40,
          },
        }}
      />
    </>
  );
};

export default QuizCharts;
