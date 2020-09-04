import React, { useEffect, useState } from "react";
import { getEvents } from "../auth/GraphService";
import { config } from "../auth/Config";
import withAuthProvider from "../auth/AuthProvider";
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
  
  const [emptyListMessage, setEmptyListMessage] = useState('')


  useEffect(() => {
    let isCancelled = false;
    async function fetchEvents() {
      try {
        // Get the user's access token
        const accessToken = await getAccessToken(config.scopes);
        let newEvents;
        if (!isCancelled) {
          // Get the user's events
          newEvents = await getEvents(accessToken);
        }
        if (!isCancelled) {
          // Update the array of events in state
          setEvents(newEvents.value);
          if (!newEvents.value.length) {
            setEmptyListMessage('No events scheduled yet..')
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setError("ERROR", JSON.stringify(err));
        }
      }
    }
    fetchEvents();

    return () => {
      isCancelled = true;
    };
  }, [getAccessToken, setError]);

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
            {emptyListMessage}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default withAuthProvider(Calendar);
