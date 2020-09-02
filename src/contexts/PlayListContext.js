import React, { createContext, useReducer } from "react";
import { playListReducer } from "../reducers/playListReducer";

export const PlayListContext = createContext();

// export const PlayListContextConsumer = PlayListContext.Consumer

const PlayListContextProvider = (props) => {
  const [playList, dispatchPlayList] = useReducer(
    playListReducer,
    initializePlayList()
  );

  return (
    <PlayListContext.Provider value={{ playList, dispatchPlayList }}>
      {props.children}
    </PlayListContext.Provider>
  );
};

export default PlayListContextProvider;

const initializePlayList = () => {
  if (localStorage.getItem("playList")) {
    return JSON.parse(localStorage.getItem("playList"));
  } else {
    return [
      {
        id: 1,
        type: "Events",
        duration: 5,
        url: null,
        text: null,
        sortBy:null,
      },
      {
        id: 2,
        type: "Text",
        duration: 5,
        url: null,
        text: "Wellcome Mr. Shapiro!",
        sortBy:null,
      },
      {
        id: 3,
        type: "Image",
        duration: 5,
        url:
          "https://res.cloudinary.com/dxqd6uu4p/image/upload/v1598182035/programmer-1653351_1280-cropped-1-1080x473_en2whi.png",
        text: null,
        sortBy:null,
      },
      {
        id: 4,
        type: "Image",
        duration: 5,
        url:
          "https://res.cloudinary.com/dxqd6uu4p/image/upload/v1598182031/illustration-vector-graphic-technoloy-background-illustration-vector-graphic-technoloy-background-business-circuit-light-170317909_po6u7o.jpg",
        text: null,
        sortBy:null,
      },
      {
        id: 5,
        type: "Video",
        duration: 15,
        url:
          "https://res.cloudinary.com/dxqd6uu4p/video/upload/v1591785964/Clouds_wb2v5i.mp4",
        text: null,
        sortBy:null,
      },
      {
        id: 6,
        type: "Image",
        duration: 5,
        url:
          "https://res.cloudinary.com/dxqd6uu4p/image/upload/v1598182028/technoloy-is-changing-industry_iqmraj.png",
        text: null,
        sortBy:null,
      },
      {
        id: 7,
        type: "Image",
        duration: 5,
        url:
          "https://res.cloudinary.com/dxqd6uu4p/image/upload/v1598182028/technoloy-is-changing-industry_iqmraj.png",
        text: null,
        sortBy:null,
      },
    ];
  }
};
