import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PURPLE_COLOR } from "../../variables/constant";

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  return (
    <Card
      variant="outlined"
      className={`card ${flip ? "flipped" : ""}`}
      sx={{ mr: 2, mb: 2, height: "200px" }}
      onClick={() => {
        setFlip(!flip);
      }}
    >
      {flip ? (
        <CardContent>
          <Typography
            className="question"
            sx={{ fontSize: "1.2em" }}
            gutterBottom
          >
            {flashcard.answer}
          </Typography>
        </CardContent>
      ) : (
        <CardContent>
          <Typography
            className="question"
            sx={{ color: PURPLE_COLOR, fontSize: "1.2em" }}
            gutterBottom
          >
            Q. {flashcard.statement}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}
