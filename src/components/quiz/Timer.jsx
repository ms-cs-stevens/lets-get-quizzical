import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function Timer() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((oldTime) => Math.min(oldTime + 1, 300000));
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={timer} />
    </Box>
  );
}

export default Timer;