import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { WHITE_COLOR } from "../../variables/constant";
// import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const useStyles = makeStyles(({ palette }) => ({
  time: {
    marginTop: "1.5rem",
    fontSize: "18px",
    padding: "1.5rem",
    color: WHITE_COLOR,
  },
}));

function Timer() {
  const styles = useStyles();
  const [today, setToday] = useState(new Date(Date.now() + 5 * 60 * 1000));
  const calculateTimeLeft = (endTime) => {
    let difference = +endTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(today));

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    // if (!timeLeft[interval]) {
    //   return;
    // }

    timerComponents.push(
      <span key={interval}>
        {interval === "minutes" && `${timeLeft[interval]}min `}
        {interval === "seconds" && `${timeLeft[interval]}sec remaining`}
      </span>
    );
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(today));
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.time}>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span>Time's up! No Bonus now!</span>
      )}
    </div>
  );
}

// function Timer() {
//   const timerProps = {
//     isPlaying: true,
//     size: 70,
//     strokeWidth: 3
//   };
//   const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
//   const endTime = stratTime + 300; // use UNIX timestamp in seconds

//   const remainingTime = endTime - stratTime;
//   const minuteSeconds = 300;

//   const renderTime = (dimension, time) => {
//     return (
//       <div className="time-wrapper">
//         <div className="time">{time}</div>
//         <div>{dimension}</div>
//       </div>
//     );
//   };
//   const getTimeSeconds = (time) => (minuteSeconds - time) | 0;

//   return (

//     <CountdownCircleTimer
//       {...timerProps}
//       colors={[["#218380"]]}
//       duration={minuteSeconds}
//       initialRemainingTime={remainingTime}
//       onComplete={(totalElapsedTime) => [
//         remainingTime - totalElapsedTime > 0
//       ]}
//     >
//       {({ elapsedTime }) =>
//         renderTime("sec", getTimeSeconds(elapsedTime))
//       }
//     </CountdownCircleTimer>
//   )
// }

export default Timer;
