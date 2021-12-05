import "./homepage.css"
import React, {useState} from 'react';

function HomePage_ss() {
  
    return (
      <div className="start">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>"Lets Get Quizzical"</title>
      <link rel="stylesheet" href="homepage.css" />
      <div className="container">
        <div id="home" className="flex-center flex-column">
          <h1>Lets Get Quizzical</h1>
          <a class= "btn" href={"/select-quiz-category"}>Start Playing</a>
          <a class= "btn" href={"/leaderboard"}>See Your Scores</a>
        </div>
      </div>
    </div>
  )
}

export default HomePage_ss;