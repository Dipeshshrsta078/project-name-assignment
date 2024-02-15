import React from "react";

import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import DomainVerificationOutlinedIcon from "@mui/icons-material/DomainVerificationOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Task } from "./Task";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const TaskList = ({
  tasks,
  setTasks,
  filteredTasks,
  setInputText,
  status,
  setStatus,
  text,
  task,
}) => {
  const handleDeleteAll = () => {
    setTasks([]);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleDelete = () => {
    setTasks(tasks.filter((e) => e.id !== task.id));
  };

  const handleEdit = () => {
    const filteredItems = tasks.filter((item) => item.id !== task.id);
    const selectedItem = tasks.find((item) => item.id === task.id);
    setInputText(selectedItem.text);
    setTasks(filteredItems);
  };

  const handleComplete = () => {
    setTasks(
      tasks.map((item) =>
        item.id === task.id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  return (
    <Grid Container direction="row">
      <Grid item xs={4}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            label="status"
            onChange={handleStatus}
            sx={{ backgroundColor: "#fff", minWidth: "200px" }}
            defaultValue={"all"}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="uncompleted">Uncompleted</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Table sx={{ minWidth: 650, px: 2 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Tasks </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>
                  {task.completed ? (
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: "line-through",
                        opacity: 0.5,
                      }}
                    >
                      {task.text}
                    </Typography>
                  ) : (
                    <Typography variant="h6">{task.text}</Typography>
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: "end" }}>
                  <ButtonGroup>
                    <Button
                      className="complete-btn"
                      variant="outlined"
                      color="success"
                      onClick={handleComplete}
                    >
                      <DomainVerificationOutlinedIcon />
                    </Button>
                    <Button
                      className="edit-btn"
                      variant="outlined"
                      onClick={handleEdit}
                    >
                      <EditCalendarOutlinedIcon />
                    </Button>
                    <Button
                      className="trash-btn"
                      variant="outlined"
                      color="error"
                      onClick={handleDelete}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      {filteredTasks.length !== 0 && (
        <Button
          style={{ margin: "20px auto", display: "flex" }}
          variant="contained"
          color="error"
          onClick={handleDeleteAll}
          startIcon={<RemoveCircleOutlineOutlinedIcon />}
        >
          <p>Delete All</p>
        </Button>
      )}
    </Grid>
  );
};
