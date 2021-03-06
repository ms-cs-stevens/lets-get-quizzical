import React from "react";
import Flashcard from "./Flashcard.jsx";
import Grid from "@mui/material/Grid";

export default function FlashcardList({ flashcards }) {
  return (
    <div className="card-grid">
      <Grid container justifyContent="space-evenly">
        {flashcards.map((flashcard) => (
          <Grid item xs={6}>
            <Flashcard flashcard={flashcard} key={flashcard.id} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
