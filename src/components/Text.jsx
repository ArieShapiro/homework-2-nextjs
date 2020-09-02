import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";
import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles({

// });

export interface TextProps {
  text: string;
}

const Text: React.SFC<TextProps> = ({ text }) => {
  // const classes = useStyles();
  return (
    <div>
      <Typography variant="h2" align="center" component={'span'}>
        <ReactMarkdown source={text} />
      </Typography>
    </div>
  );
};

export default Text;
