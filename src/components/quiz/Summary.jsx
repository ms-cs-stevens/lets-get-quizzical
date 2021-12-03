import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import InfoCard from './InfoCard';
import TimerIcon from '@mui/icons-material/Timer';
import GradeIcon from '@mui/icons-material/Grade';
import CheckIcon from '@mui/icons-material/Check';
import PercentIcon from '@mui/icons-material/Percent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { red, orange, green, blue } from "@material-ui/core/colors";

const Summary = ({score, questionLength}) => {
  return (<div><h1>SUMMARY</h1>
  <Grid container spacing={3}>
    <Grid item lg={3} sm={6} xl={3} xs={12}>
      <InfoCard
        title="Accuracy"
        value="90"
        icon={<PercentIcon />}
        color={orange}
      />
    </Grid>
    <Grid item lg={3} sm={6} xl={3} xs={12}>
      <InfoCard
        title="Total Time"
        value='90'
        icon={<TimerIcon />}
        color={red}
      />
    </Grid>
    <Grid item lg={3} sm={6} xl={3} xs={12}>
      <InfoCard
        title="Score"
        value={score}
        icon={<GradeIcon />}
        color={blue}
      />
    </Grid>
    <Grid item lg={3} sm={6} xl={3} xs={12}>
      <InfoCard
        title="Correct"
        value={"$" + '90'}
        icon={<CheckIcon />}
        color={green}
      />
    </Grid>
  </Grid>
  <br />
  <Card variant="outlined">
    <CardContent>
      <Typography variant="h5" component="div" sx={{ mb: 5, mt: 3 }}>
        You scored {score} out of {questionLength}
      </Typography>
    </CardContent>
  </Card></div>);
}

export default Summary;