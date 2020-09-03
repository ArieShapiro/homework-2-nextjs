import React, { useEffect, useState } from "react";
import { getEvents } from "./Calendar/GraphService";
import { config } from "./Calendar/Config";
import withAuthProvider from "./Calendar/AuthProvider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Paper from "@material-ui/core/Paper";

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

const Calendar = ({ sortBy, getAccessToken, setError }) => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Get the user's access token
        var accessToken = await getAccessToken(config.scopes);
        // Get the user's events
        var newEvents = await getEvents(accessToken);
        // Update the array of events in state
        setEvents(newEvents.value);
      } catch (err) {
        setError("ERROR", JSON.stringify(err));
      }
    }
    fetchEvents();
  }, []);

  const sortEvents = (sortType, items) => {
    if (sortType === "title") {
      return items.sort((a, b) => {
        if (a > b) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      return items;
    }
  };

  // console.log(sortEvents("title", events));

  return (
    <div>
      <Box mb={5}>
        <Typography variant="h2" component="div" align="center">
          Upcoming Events
        </Typography>
      </Box>
      <div>
        {events.length ? (
          <div>
            {sortEvents(sortBy, events).map((event) => {
              return (
                <Box my={3} key={event.id}>
                  <Paper elevation={2} className={classes.paper}>
                    <Box p={3}>
                      <Typography variant="h6" align="left">
                        {event.subject}
                      </Typography>

                      <Typography align="left">
                        {`${event.location.displayName} (${formatDateTime(
                          event.start.dateTime
                        )} - ${formatDateTime(event.end.dateTime)})`}
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
    </div>
  );
};

export default withAuthProvider(Calendar);
