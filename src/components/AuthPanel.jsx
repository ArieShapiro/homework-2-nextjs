import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
 paper:{
   width:'350px',
   margin:'20px 0 0 20px',
   position:'relative',
   right:'470px'
  },
  btn:{
    backgroundColor:'#0095a8',
    color:'white'
  }
}));

function AuthNavItem(props) {
  const classes = useStyles();
  // If authenticated, return a dropdown with the user's info and a
  // sign out button
  // if (props.isAuthenticated) {
  return (
    <div>
      {props.isAuthenticated ? (
        <div>
          <Paper elevation={2} className={classes.paper}>
            <Box p={2}>
              <Typography variant="h5" component="div">
                {props.user.displayName}
              </Typography>
              <Box my={1}>
                <Typography variant="subtitle1" component="div">
                  {props.user.email}
                </Typography>
              </Box>
              <Button
                onClick={props.authButtonMethod}
                variant="contained"
                className={classes.btn}
                >
                Sign Out
              </Button>
            </Box>
          </Paper>
        </div>
      ) : (
        <Button
        onClick={props.authButtonMethod}
        variant="contained"
        className={classes.btn}
          >
          Sign In
        </Button>
      )}
    </div>
  );
}

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <AuthNavItem
          isAuthenticated={this.props.isAuthenticated}
          authButtonMethod={this.props.authButtonMethod}
          user={this.props.user}
        />
      </div>
    );
  }
}
