import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  return (
    <Card
      variant="outlined"
      className="card"
      sx={{ mr: 2, mb: 2 }}
      onClick={() => {
        setFlip(!flip);
      }}
    >
      {flip ? (
        <CardContent>{flashcard.answer}</CardContent>
      ) : (
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {flashcard.statement}
          </Typography>
          <br />
          {flashcard.choices.map((option, index) => {
            return (
              <div className="flashcard-option" key={option}>
                <Typography>
                  ({index + 1}) {option}
                </Typography>
              </div>
            );
          })}
        </CardContent>
      )}
    </Card>
  );
}
