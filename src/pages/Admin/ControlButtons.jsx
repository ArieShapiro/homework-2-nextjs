import React from 'react';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Tooltip from "@material-ui/core/Tooltip";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ImageIcon from "@material-ui/icons/Image";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import TodayIcon from "@material-ui/icons/Today";


const actions = [
    { icon: <ImageIcon />, name: "Image" },
    { icon: <PlayCircleFilledIcon />, name: "Video" },
    { icon: <TextFieldsIcon />, name: "Text" },
    { icon: <TodayIcon />, name: "Events" },
  ];

const ControlButtons = ({setSpeedDial, speedDial, openNewItemDialog, classes}) => (
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
      </Typography>
    </Box>
  );

  export default ControlButtons