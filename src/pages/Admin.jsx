import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import arrayMove from "array-move";
import Grid from "@material-ui/core/Grid";
import { v4 as uuidv4 } from "uuid";
import ItemsList from "./Admin/ItemsList";
import ItemDialog from "./Admin/ItemDialog";
import ControlButtons from './Admin/ControlButtons'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
    margin: "auto",
  },
  headTitle: {
    color: "#0095a8",
  },
  listItem: {
    margin: "5px 0",
    listStyle: "none",
  },
  helperClass: {
    listStyle: "none",
    top: "0",
  },
  addIcon: {
    fontSize: "1.5em",
  },
  backIcon: {
    fontSize: "1.5em",
    color: "#0095a8",
  },
  speedDialColor: {
    backgroundColor: "#0095a8",
    "&:hover": {
      backgroundColor: "#0095a8",
    },
  },
  formControl: {
    minWidth: "300px",
    minHeight: "200px",
  },
  linkField: {
    margin: "30px 0",
  },
  select: {
    display: "block",
    margin: "0 0 30px 0",
    width: "150px",
  },
  duration: {
    width: "120px",
    margin: "0 0 20px 0",
  },
  announcement: {
    width: "400px",
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
  deleteIcon: {
    color: "#ff7b72",
  },
  editIcon: {
    color: "#0095a8",
  },
  itemIcon: {
    color: "#0095a8",
  },
}));

const Admin = ({ AuthPanel }) => {
  const classes = useStyles();
  const [playList, setPlayList] = useState(
    JSON.parse(localStorage.getItem("playList"))
  );
  const [dialog, setDialog] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [speedDial, setSpeedDial] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [duration, setDuration] = useState("5");
  const [sortBy, setSortBy] = useState("time");
  const [textInput, setTextInput] = useState("");

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let currOrder = [...playList];
    localStorage.setItem(
      "playList",
      JSON.stringify(arrayMove(currOrder, oldIndex, newIndex))
    );
    setPlayList(JSON.parse(localStorage.getItem("playList")));
  };

  const onDeleteItem = (id, e) => {
    e.stopPropagation();
    const currPlayList = [...playList];
    const newPlayList = currPlayList.filter((item) => item.id !== id);
    localStorage.setItem("playList", JSON.stringify(newPlayList));
    setPlayList(JSON.parse(localStorage.getItem("playList")));
  };

  const onEditItem = (item) => {
    setEditedItem(item);
    setDialogType(item.type);
    setDuration(item.duration);
    setSortBy(item.sortBy);

    if (item.type === "Image" || item.type === "Video") {
      setTextInput(item.url);
    } else if (item.type === "Text") {
      setTextInput(item.text);
    }

    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(false);
    setTextInput("");
    setDuration("5");
    setSortBy("time");
    setTimeout(() => {
      setSpeedDial(false);
    }, 300);
  };

  const openNewItemDialog = (type) => {
    setEditedItem(null);
    setDialogType(type);
    setDialog(true);
  };

  const onHideItem = (item) => {
    const idx = playList.indexOf(item);
    let newPlayList = [...playList];
    newPlayList[idx].duration = "0";
    localStorage.setItem("playList", JSON.stringify(newPlayList));
    setPlayList(JSON.parse(localStorage.getItem("playList")));
  };

  const saveItem = () => {
    // New added Item
    if (!editedItem) {
      const type = dialogType;
      const newItem = {
        id: uuidv4(),
        type: type,
        duration: duration,
        url: type === "Image" || type === "Video" ? textInput : "",
        text: type === "Text" ? textInput : "",
        sortBy: type === "Events" ? sortBy : null,
      };
      let newPlayList = [...playList, newItem];
      localStorage.setItem("playList", JSON.stringify(newPlayList));
      setPlayList(JSON.parse(localStorage.getItem("playList")));
      closeDialog();
      // Edited Item
    } else {
      const idx = playList.indexOf(editedItem);
      const newEditedItem = {
        id: editedItem.id,
        type: editedItem.type,
        duration: duration,
        url:
          editedItem.type === "Image" || editedItem.type === "Video"
            ? textInput
            : "",
        text: editedItem.type === "Text" ? textInput : "",
        sortBy: editedItem.type === "Events" ? sortBy : null,
      };
      let currPlayList = [...playList];
      currPlayList[idx] = newEditedItem;
      const newPlayList = currPlayList;
      localStorage.setItem("playList", JSON.stringify(newPlayList));
      setPlayList(JSON.parse(localStorage.getItem("playList")));
      closeDialog();
    }
  };

  const handleChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleTextFieldChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleChangeSortBy = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          {AuthPanel}
        </Grid>

        <Grid item xs={9}>
          <Typography
            variant="h2"
            align="center"
            component={"span"}
            className={classes.headTitle}
          >
            Manage Playlist
          </Typography>

          <ControlButtons
            classes={classes}
            speedDial={speedDial}
            setSpeedDial={setSpeedDial}
            openNewItemDialog={openNewItemDialog}
          ></ControlButtons>

          {playList.length ? (
            <ItemsList
              classes={classes}
              playList={playList}
              onSortEnd={onSortEnd}
              onDeleteItem={onDeleteItem}
              onEditItem={onEditItem}
              onHideItem={onHideItem}
            ></ItemsList>
          ) : (
            <Typography align="center" variant="h6" component={"p"}>
              No content yet..
            </Typography>
          )}

          <ItemDialog
            classes={classes}
            dialog={dialog}
            dialogType={dialogType}
            duration={duration}
            sortBy={sortBy}
            textInput={textInput}
            closeDialog={closeDialog}
            saveItem={saveItem}
            handleChangeDuration={handleChangeDuration}
            handleTextFieldChange={handleTextFieldChange}
            handleChangeSortBy={handleChangeSortBy}
          ></ItemDialog>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
