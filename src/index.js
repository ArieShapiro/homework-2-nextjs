import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PlayListContextProvider from "./contexts/PlayListContext";

ReactDOM.render(
  <PlayListContextProvider>
    <App />
  </PlayListContextProvider>,
  document.getElementById("root")
);
