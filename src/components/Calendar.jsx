import React from "react";
import { getEvents } from "./Calendar/GraphService";
import { config } from "./Calendar/Config";
import withAuthProvider, { AuthComponentProps } from "./Calendar/AuthProvider";
import Typography from "@material-ui/core/Typography";
import CalendarEvents from "./Calendar/CalendarEvents";
import Box from "@material-ui/core/Box";




class Calendar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      sortBy: "time",
      selectValues: [],
    };
  }

  async componentDidMount() {
    try {
      // Get the user's access token
      var accessToken = await this.props.getAccessToken(config.scopes);
      // Get the user's events
      var events = await getEvents(accessToken);
      // Update the array of events in state
      this.setState({ events: events.value });
    } catch (err) {
      this.props.setError("ERROR", JSON.stringify(err));
    }
  }

  render() {
    return (
      <div>
        <Box mb={5}>
          <Typography variant="h2" component="div" align="center">
            Upcoming Events
          </Typography>
        </Box>
        <CalendarEvents events={this.state.events} />
      </div>
    );
  }
}

export default withAuthProvider(Calendar);
