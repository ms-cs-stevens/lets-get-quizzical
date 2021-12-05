import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { useHistory } from "react-router";
import {Grid, Typography, Fab, ListItemText, ListItem, List, Divider} from "@material-ui/core";
import ListItemButton from '@mui/material/ListItemButton';
  // leader board dummy data
import dummyData from '../../dataset/leaderboard.json'

const Leaderboard = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    history.push("/login");
  }

  function gridCore(data, position){
    return (
      <div style={{ position: "relative" }}>
        <img src={data.image}
          style={{  width: "128px", height: "128px"  ,borderRadius : "50%"  }}
        /><br/>
        <p  style={{color: "white", "opacity": .8, fontSize: "2rem" , lineHeight: "10%", fontWeight: "200"}}> {data.score}</p>
        <Typography variant="button" gutterBottom style={{color: "white", "opacity": .7}}> {data.userName} </Typography>
        
        <Fab size="small" style={{ position: "absolute", top: 0 ,background: "#fb8c00", color: "white", boxShadow: "0px !important"}}>{position}</Fab>
      </div>)
  }

  function generateWinners(data){
    return (
    <Grid container spacing={10} justifyContent="center">
      <Grid item xs4>
        {gridCore(data[2],3)}
      </Grid>
      <Grid item xs4 style={{ transform: "translateY(-50%)"  }}>
        {gridCore(data[0],1)}
      </Grid>
      <Grid item xs4>
        {gridCore(data[1],2)}
      </Grid>
    </Grid>)
  }

  function generateRunnerUp(data){
    return (
      <List style={{ width: "75%" }}>
        {data.map( (k,i,a) => 
          <>
          <ListItem style={{ background: "#a01671" }}>
            <ListItemText>
              <ListItemButton >
                  <Grid container alignItems="center" >
                    <Grid item xs={2}>
                      <img src={k.image} style={{ width: "40px", height: "40px", borderRadius: "50%" }}></img>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="button" style={{color: "#bfbdc7"}}>{k.userName}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Fab size="small" style={{ position: "absolute", top: 0 ,background: "#f5d8b3", boxShadow: "0px !important"}}>{k.score}</Fab>
                    </Grid>
                  </Grid>
                  
                
              </ListItemButton>
            </ListItemText>
            
          </ListItem>
          <Divider light />
        </>
        )}
      </List>     
    )
  }

  return (
    <Grid container direction="center" alignItems="center" justifyContent="center" style={{ backgroundImage: "url('bg-web.jpg')", minHeight: "100vh", width: "100%" }}>

      {/* winners grid */} 
      <Grid item xs={8} style={{ marginTop: "20vh" }}>
        {generateWinners(dummyData.slice(0,3))}
      </Grid> 
      {/* Runner ups */}

      <Grid item xs={6} >
        <Grid container justifyContent="center" >
          {generateRunnerUp(dummyData.slice(3, dummyData.length))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Leaderboard;
