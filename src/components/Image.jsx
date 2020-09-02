import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  img: {
    position: "fixed",
    right: "0",
    bottom: "0",
    minWidth: "100%",
    minHeight: "100%",
  },
});

export interface ImageProps {
  url: string;
}

const Image: React.SFC<ImageProps> = ({ url }) => {
  const classes = useStyles();
  return (
    <div>
      <img src={url} alt="img" className={classes.img} />
    </div>
  );
};

export default Image;
