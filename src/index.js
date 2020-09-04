import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import PlayListContextProvider from "./contexts/PlayListContext";



// Couple notes to the reviewer:

// 1. Normally I try to avoid as much class based components. Here I have to take some redy code
//    snippets from Microsoft Graph API, so I didn't chnag ryet all of it.
// 2. Initially I planed to use a central store with the contact API, but later
//    decided to store the data in the LocalStorage, in order for it to be saved,
//    since the doesn't have a baclend currently. I still left the PlayListcontext.js
//    for later use when we gonna have a backend

ReactDOM.render(<App />, document.getElementById("root"));
