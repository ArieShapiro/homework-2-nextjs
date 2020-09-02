import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    video: {
      position: "fixed",
      right: "0",
      bottom: "0",
      minWidth: "100%",
      minHeight: "100%",
    },
   
  });
export interface VideoProps {
  url: string;
}

const Video: React.SFC<VideoProps> = ({ url }) => {
  const classes = useStyles();
  return (
    <video autoPlay muted preload="auto" loop className={classes.video}>
      <source src={url} />
    </video>
  );
};

export default Video;
