var graph = require("@microsoft/microsoft-graph-client");



function getAuthenticatedClient(accessToken) {
  const client = graph.Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
  return client;
}

export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client.api('/me').get();
  return user;
}



export async function getEvents(accessToken) {
  const client = getAuthenticatedClient(accessToken);
  const currTime = new Date().toISOString()
  const endTime = new Date(new Date((new Date()).setDate(new Date().getDate() + 1)).setHours(0)).toISOString()
  const events = await client
    .api(`/me/calendarview?startdatetime=${currTime}&enddatetime=${endTime}`)
    .select("subject,start,end,location")
    .orderby("createdDateTime DESC")
    .get();
  console.log(JSON.parse(JSON.stringify(events)));
  return events;
}
