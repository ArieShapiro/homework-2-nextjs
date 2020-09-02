import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Helper function to format Graph date/time
function formatDateTime(dateTime) {
  if (dateTime !== undefined) {
    return moment.utc(dateTime).local().format("LT");
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "40%",
    margin: "auto",
  },
}));



const CalendarEvents = ({ events }) => {
  const classes = useStyles();
  // const []

  return (
    <div>
      {events.length ? (
        <div>
          {events.map(function (event) {
            return (
              <Box my={3} key={event.id}>
                <Paper elevation={2} className={classes.paper}>
                  <Box p={3}>
                    <Typography variant="h6" align="left">
                      {event.subject}
                    </Typography>
                    <Typography align="left">
                      {`${event.location?.displayName} (${formatDateTime(
                        event.start?.dateTime
                      )} - ${formatDateTime(event.end?.dateTime)})`}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            );
          })}
        </div>
      ) : (
        <Typography variant="h4" component="p" align="center">
          No events scheduled for today..
        </Typography>
      )}
    </div>
  );
};

export default CalendarEvents;
