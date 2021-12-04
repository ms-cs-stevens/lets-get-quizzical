import React, { useEffect } from "react";
import Chart from "react-google-charts";

const QuizCharts = ({ uid }) => {
  useEffect(() => {});

  return (
    <>
      <div style={{ display: "flex", maxWidth: 900 }}>
        <Chart
          width={850}
          height={600}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            [
              "Date",
              "Mathematics",
              "Country Capitals",
              "Solar System",
              "Antonyms",
            ],
            ["Q1", 20, 10, 15, 30],
            ["Q2", 25, 27, 30, 29],
            ["Q3", 15, 20, 25, 25],
            ["Q4", 18, 5, 18, 30],
          ]}
          options={{
            title: "Performance in each category",
            hAxis: { title: "Quiz", titleTextStyle: { color: "#333" } },
            vAxis: {
              title: "Score",
              titleTextStyle: { color: "#333" },
              minValue: 0,
              maxValue: 40,
            },
          }}
        />
      </div>
    </>
  );
};

export default QuizCharts;
