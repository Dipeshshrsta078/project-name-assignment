import React from "react";

import DomainVerificationOutlinedIcon from "@mui/icons-material/DomainVerificationOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Button, ButtonGroup } from "@mui/material";
//import { SettingsInputAntennaTwoTone } from "@material-ui/icons";

export const Task = ({ text, task, tasks, setTasks, setInputText }) => {

  return (
    <div className="task">
        {text}
    </div>
  );
};
