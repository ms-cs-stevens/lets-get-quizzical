import React from "react";
import Flashcard from "./Flashcard.jsx";
import Grid from "@mui/material/Grid";

export default function FlashcardList({ flashcards }) {
  return (
    <div className="card-grid">
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        alignContent="center"
      >
        {flashcards.map((flashcard, index) => (
          <Grid item xs={4} key={index}>
            <Flashcard flashcard={flashcard} key={flashcard.id} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
