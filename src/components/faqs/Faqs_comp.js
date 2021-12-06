import "./FAQ_css.css";
import React, { useState } from "react";
import Header from "./FAQ_Header";
import FAQ from "./FAQ";

function Faqs() {
  const [faqs, setfaqs] = useState([
    {
      question:
        "Do I need to register for accessing the flashcards, quizzes, and leaderboard ?",
      answer: "Yes",
      open: true,
    },
    {
      question: "How many points do I gain for selecting the correct answer?",
      answer: "3 Points",
      open: false,
    },
    {
      question: "How many points do I loose for selecting the wrong answer?",
      answer: "1 Point",
      open: false,
    },
    {
      question: "Can I earn bonus points?",
      answer:
        "Yes, if you finnish the quiz in the given time frame, you earn 1 extra point for every correct answer",
      open: false,
    },
    {
      question: "What does the leaderboard page tell me?",
      answer:
        "The leaderboard keeps track of the total points you earned for all quizess, as your rank number based on your total score",
      open: false,
    },
    {
      question: "Can I reset my password?",
      answer:
        "Currently this is not possible, but you can change your user-name",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setfaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };
  return (
    <div className="app-bg">
      <Header />
      <div className="faqs">
        {faqs.map((faq, i) => (
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
  );
}

export default Faqs;
