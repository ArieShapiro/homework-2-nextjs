import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

const ItemDialog = ({
  dialog,
  closeDialog,
  classes,
  duration,
  handleChangeDuration,
  dialogType,
  sortBy,
  handleChangeSortBy,
  textInput,
  handleTextFieldChange,
  saveItem,
}) => (
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
);

export default ItemDialog;
