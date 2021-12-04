import React from "react";
import NoSsr from "@material-ui/core/NoSsr";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useApexInfoStyles } from "@mui-treasury/styles/info/apex";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import star from "../../icons/star.svg";
import power from "../../icons/power.svg";
import group from "../../icons/group.svg";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    transition: "0.3s",
    position: "relative",
    "&:before": {
      transition: "0.2s",
      position: "absolute",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      backgroundColor: "#d9daf1",
      borderRadius: "1rem",
      zIndex: 0,
      bottom: 0,
    },
    "&:hover": {
      "&:before": {
        bottom: -6,
      },
      "& $card": {
        boxShadow: "-12px 12px 64px 0 #bcc3d6",
      },
    },
  },
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "1rem",
    boxShadow: "0 6px 20px 0 #dbdbe8",
    backgroundColor: "#fff",
    transition: "0.4s",
    height: "100%",
    height: "18vw",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: "0.75rem",
  },
  avatar: {
    fontFamily: "Ubuntu",
    fontSize: "0.875rem",
    backgroundColor: "#6d7efc",
  },
  join: {
    background: "linear-gradient(to top, #638ef0, #82e7fe)",
    "& > *": {
      textTransform: "none !important",
    },
  },
  Icon: {},
  luckyIcon: {
    marginLeft: "60px",
    height: "64px",
    width: "64px",
    borderRadius: "50%",
    justifyContent: "center",
    backgroundColor: "#ffbf1c",
    border: "4px solid #f2b00a",
    boxShadow: "0px 0px 59px 0px rgba(255, 191, 28, 1)",
  },
  powerIcon: {
    marginLeft: "60px",
    height: "64px",
    width: "64px",
    borderRadius: "50%",
    justifyContent: "center",
    backgroundColor: "#7aceba",
    border: "4px solid #5ebea7",
    boxShadow: "0px 0px 59px 0px rgba(122, 206, 186, 1)",
  },
  groupIcon: {
    marginLeft: "60px",
    height: "64px",
    width: "64px",
    borderRadius: "50%",
    justifyContent: "center",
    backgroundColor: "#ffa5de",
    border: "4px solid#f085c9",
    boxShadow: "0px 0px 59px 0px rgba(255, 165, 222, 1)",
  },
  luckyText: {
    marginLeft: "70px",
  },
  powerText: {
    marginLeft: "45px",
  },
  groupText: {
    marginLeft: "50px",
  },
}));

const CustomCard = ({
  thumbnail,
  title,
  subtitle,
  description,
  bottomText,
  joined = false,
}) => {
  const classes = useStyles();
  const btnStyles = useGraphicBtnStyles();
  return (
    <div className={classes.root}>
      <Column className={classes.card}>
        <Row p={2} gap={2}>
          <Avatar
            className={classes.logo}
            variant={"rounded"}
            src={thumbnail}
          />
          <Info position={"middle"} useStyles={useApexInfoStyles}>
            <InfoTitle>{title}</InfoTitle>
            <InfoSubtitle>{subtitle}</InfoSubtitle>
          </Info>
        </Row>
        <Row pb={3} px={2}>
          {description}
        </Row>
        <Row p={1} gap={1} position={"bottom"}>
          {bottomText}
        </Row>
      </Column>
    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard() {
  const classes = useStyles();
  return (
    <>
      <NoSsr></NoSsr>
      <Grid container spacing={4}>
        {/* <Grid item xs={12} md={3} lg={12}>
          <CustomCard
            thumbnail={
              "https://media.istockphoto.com/vectors/trophy-flat-icon-pixel-perfect-for-mobile-and-web-vector-id1152889195?k=20&m=1152889195&s=612x612&w=0&h=M3T0JbkRZUAnFqbmqxVVMmrtc506_p5RTzoAr2m61KU="
            }
            title={"Achievements"}
            description={
              <>
                <div className={classes.luckyIcon}>
                  <img class="icon-lg" src={star} />
                </div>
                <div className={classes.powerIcon}>
                  <img class="icon-lg" src={power} />
                </div>
                <div className={classes.luckyIcon}>
                  <img class="icon-lg" src={star} />
                </div>
              </>
            }
          />
        </Grid> */}
        <Grid item xs={12} md={3} lg={6}>
          <CustomCard
            thumbnail={
              "https://media.istockphoto.com/vectors/trophy-flat-icon-pixel-perfect-for-mobile-and-web-vector-id1152889195?k=20&m=1152889195&s=612x612&w=0&h=M3T0JbkRZUAnFqbmqxVVMmrtc506_p5RTzoAr2m61KU="
            }
            title={"Achievements"}
            description={
              <>
                <div className={classes.luckyIcon}>
                  <img id="star" class="icon-lg" src={star} />
                  <br />
                  <label htmlFor="star">Lucky</label>
                </div>
                <div className={classes.powerIcon}>
                  <img id="power" class="icon-lg" src={power} />
                  <label htmlFor="power">Comeback</label>
                </div>
                <div className={classes.groupIcon}>
                  <img id="group" class="icon-lg" src={group} />
                  <label htmlFor="group">Leader</label>
                </div>
              </>
            }
            // bottomText={
            //   <>
            //     <Typography
            //       className={classes.luckyText}
            //       component="h6"
            //       variant="h6"
            //     >
            //       Lucky
            //     </Typography>
            //     <Typography
            //       className={classes.powerText}
            //       component="h6"
            //       variant="h6"
            //     >
            //       Comeback
            //     </Typography>
            //     <Typography
            //       className={classes.groupText}
            //       component="h6"
            //       variant="h6"
            //     >
            //       Leader
            //     </Typography>
            //   </>
            // }
          />
        </Grid>
        <Grid item xs={12} md={3} lg={6}>
          <CustomCard
            joined
            thumbnail={
              "https://thumbs.dreamstime.com/b/inventory-checkboard-icon-outline-style-inventory-checkboard-icon-outline-inventory-checkboard-vector-icon-web-design-isolated-173337918.jpg"
            }
            title={"Inventory"}
            description={
              <>
                <div className={classes.luckyIcon}>
                  <img id="star" class="icon-lg" src={star} />
                  <br />
                  <label htmlFor="star">Extra Time</label>
                </div>
                <div className={classes.powerIcon}>
                  <img id="power" class="icon-lg" src={power} />
                  <label htmlFor="power">50/50</label>
                </div>
                <div className={classes.groupIcon}>
                  <img id="group" class="icon-lg" src={group} />
                  <label htmlFor="group">Most Popular Answer</label>
                </div>
              </>
            }
            // bottomText={
            //     <>
            //       <Typography
            //         className={classes.luckyText}
            //         component="h6"
            //         variant="h6"
            //       >
            //         Extra Time
            //       </Typography>
            //       <Typography
            //         className={classes.powerText}
            //         component="h6"
            //         variant="h6"
            //       >
            //         50/50
            //       </Typography>
            //       <Typography
            //         className={classes.groupText}
            //         component="h6"
            //         variant="h6"
            //       >
            //         Most Popular Answer
            //       </Typography>
            //     </>
            //   }
          />
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            thumbnail={'https://avatarfiles.alphacoders.com/537/53765.jpg'}
            title={'Overwatch official'}
            subtitle={'Created by Bliz'}
            description={
              <>
                <b>RainBOW</b> and 3 others are already members of this group.
              </>
            }
          />
        </Grid> */}
      </Grid>
    </>
  );
});
export default TeamCardDemo;
