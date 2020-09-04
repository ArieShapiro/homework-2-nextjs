import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import TodayIcon from "@material-ui/icons/Today";

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

const SortableItem = SortableElement(({ value }) => <div>{value}</div>);

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

const ItemsList = ({
  classes,
  onSortEnd,
  playList,
  onHideItem,
  onEditItem,
  onDeleteItem,
}) => (
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
);

export default ItemsList;
