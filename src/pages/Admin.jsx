import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import ImageIcon from "@material-ui/icons/Image";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import TodayIcon from "@material-ui/icons/Today";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Tooltip from "@material-ui/core/Tooltip";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { v4 as uuidv4 } from "uuid";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

const SortableItem = SortableElement(({ value }) => <div>{value}</div>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

const itemIcon = (type) => {
  switch (type) {
    case "Image":
      return <ImageIcon />;
    case "Video":
      return <PlayCircleFilledIcon />;
    case "Text":
      return <TextFieldsIcon />;
    case "Events":
      return <TodayIcon />;
    default:
      break;
  }
};

const itemText = (item) => {
  switch (item.type) {
    case "Image":
      return item.url.substring(0, 15) + "...";
    case "Video":
      return item.url.substring(0, 15) + "...";
    case "Text":
      return item.text ? item.text.substring(0, 15) + "..." : "";
    case "Events":
      return "";
    default:
      break;
  }
};
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

const actions = [
  { icon: <ImageIcon />, name: "Image" },
  { icon: <PlayCircleFilledIcon />, name: "Video" },
  { icon: <TextFieldsIcon />, name: "Text" },
  { icon: <TodayIcon />, name: "Events" },
];

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
    // New Item
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
      // Edit Item
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
          <Box display="flex" justifyContent="space-between" my={4}>
            <Typography align="right" component={"span"}>
              <Tooltip title="To Screen View" placement="right">
                <Link to="/">
                  <IconButton>
                    <ArrowBackIcon className={classes.backIcon} />
                  </IconButton>
                </Link>
              </Tooltip>
            </Typography>
            <Typography align="left" component={"span"}>
              {/* ****************** Speed Diel ******************************** */}
              <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.addIcon}
                icon={<SpeedDialIcon />}
                onClose={() => {
                  setSpeedDial(false);
                }}
                onOpen={() => {
                  setSpeedDial(true);
                }}
                open={speedDial}
                direction="left"
                FabProps={{
                  className: classes.speedDialColor,
                }}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipPlacement="bottom"
                    onClick={() => {
                      setSpeedDial(false);
                      openNewItemDialog(action.name);
                    }}
                  />
                ))}
              </SpeedDial>
              {/* ************************************************************** */}
            </Typography>
          </Box>

          {playList.length ? (
            <List>
              <SortableList
                pressDelay={300}
                helperClass={classes.helperClass}
                onSortEnd={onSortEnd}
                items={playList.map((item) => (
                  <Paper elevation={2}>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon className={classes.itemIcon}>
                        {itemIcon(item.type)}
                      </ListItemIcon>

                      <ListItemText secondary={itemText(item)} />

                      <ListItemSecondaryAction>
                        {item.duration !== "0" ? (
                          <IconButton
                            onClick={(e) => {
                              onHideItem(item);
                            }}
                          >
                            <VisibilityIcon className={classes.editIcon} />
                          </IconButton>
                        ) : (
                          <IconButton>
                            <VisibilityOffIcon />
                          </IconButton>
                        )}

                        <IconButton
                          onClick={(e) => {
                            onEditItem(item);
                          }}
                        >
                          <EditIcon className={classes.editIcon} />
                        </IconButton>
                        <IconButton
                          onClick={(e) => {
                            onDeleteItem(item.id, e);
                          }}
                        >
                          <DeleteIcon className={classes.deleteIcon} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Paper>
                ))}
              />
            </List>
          ) : (
            <Typography align="center" variant="h6" component={"p"}>
              No content yet..
            </Typography>
          )}

          {/* ************************* Dialog ****************************************** */}
          <Dialog open={dialog} onClose={closeDialog}>
            <DialogContent>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  className={classes.duration}
                  variant="outlined"
                  id="standard-select-currency"
                  select
                  label="Duration in sec."
                  value={duration}
                  onChange={handleChangeDuration}
                >
                  <MenuItem value={"0"}>0</MenuItem>
                  <MenuItem value={"5"}>5</MenuItem>
                  <MenuItem value={"10"}>10</MenuItem>
                  <MenuItem value={"15"}>15</MenuItem>
                  <MenuItem value={"30"}>30</MenuItem>
                  <MenuItem value={"60"}>60</MenuItem>
                </TextField>
                {/* *************** Sort By ************** */}

                {dialogType === "Events" ? (
                  <TextField
                    className={classes.duration}
                    variant="outlined"
                    id="standard-select-currency"
                    select
                    label="Sory by"
                    value={sortBy}
                    onChange={handleChangeSortBy}
                  >
                    <MenuItem value={"time"}>Time</MenuItem>
                    <MenuItem value={"title"}>Title</MenuItem>
                  </TextField>
                ) : null}

                {/* ************************************** */}

                {dialogType === "Image" || dialogType === "Video" ? (
                  <TextField
                    className={classes.linkField}
                    margin="dense"
                    autoFocus
                    label="Link"
                    fullWidth
                    placeholder={"https://www..."}
                    value={textInput}
                    onChange={handleTextFieldChange}
                  />
                ) : null}

                {dialogType === "Text" ? (
                  <TextField
                    className={classes.announcement}
                    autoFocus
                    label="Announcement"
                    multiline
                    rows={4}
                    placeholder={"Write here your announcement.."}
                    value={textInput}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                  />
                ) : null}
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={saveItem} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
          {/* *************************************************************************** */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
