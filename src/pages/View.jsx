import React, { useEffect, useState } from "react";
import Text from "../components/Text";
import Calendar from "../components/Calendar";
import Image from "../components/Image";
import Video from "../components/Video";
// import { PlayListContext } from "../contexts/PlayListContext";
import Typography from "@material-ui/core/Typography";


const View = () => {
  // const { playList } = useContext(PlayListContext);
  const [playList] = useState(
    JSON.parse(localStorage.getItem("playList"))
  );
  const [currItem, setCurrItem] = useState(playList[0]);

  useEffect(() => {
    const goToNextItem = () => {
      if (playList.indexOf(currItem) === playList.length - 1) {
        setCurrItem(playList[0]);
      } else {
        setCurrItem(playList[playList.indexOf(currItem) + 1]);
      }
    };

    if (currItem && currItem.duration !== 0) {
      setTimeout(() => {
        goToNextItem();
      }, currItem.duration * 1000);
    } else {
      goToNextItem();
    }
    
  }, [currItem, playList]);

  return (
    <div>
      {playList.length && currItem.duration !== '0' ? (
        currItem.type === "Events" ? (
          <Calendar />
        ) : currItem.type === "Text" ? (
          <Text text={currItem.text} />
        ) : currItem.type === "Image" ? (
          <Image url={currItem.url} />
        ) : (
          <Video url={currItem.url} />
        )
      ) : (
        <Typography variant="h2" component="div" align="center">
          No content to show..
        </Typography>
      )}
    </div>
  );
};

export default View;
