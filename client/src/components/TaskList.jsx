import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DomainVerificationOutlinedIcon from "@mui/icons-material/DomainVerificationOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import RemoveDoneOutlinedIcon from "@mui/icons-material/RemoveDoneOutlined";
import {
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../App";

export const TaskList = ({
  tasks,
  setTasks,
  filteredTasks,
  setFilteredTasks,
  setEditItemId,
  setInputText,
  status,
  setStatus,
  text,
  task,
}) => {
  const [open, setOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("success");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/tasks/${id}`);
      setTasks(response.data.data);
      setOpen(true);
      setSnackbarMsg(response.data.msg);
      setSnackbarColor("green");
    } catch (err) {
      setOpen(true);
      setSnackbarMsg(err.error);
      setSnackbarColor("red");
    }
  };

  const handleEdit = (task) => {
    const filteredItems = tasks.filter((item) => item.id !== task.id);
    const selectedItem = tasks.find((item) => item.id === task.id);
    setInputText(selectedItem.title);
    setEditItemId(selectedItem.id);
    setTasks(filteredItems);
  };

  const handleComplete = async (task) => {
    try {
      const response = await axios.put(`${baseUrl}/tasks/${task.id}`, {
        status: !task.status,
      });
      setTasks(response?.data?.data);
      setFilteredTasks(response?.data?.data);
    } catch (err) {}
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          sx: {
            background: snackbarColor,
          },
        }}
        message={snackbarMsg}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Grid container direction="row" justifyContent={"center"}>
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
              <MenuItem value="incomplete">Incomplete</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ maxHeight: "500px", overflow: "auto", mt: 1 }}>
            <Table
              sx={{
                minWidth: 650,
                px: 2,
                ".MuiTableCell-head": {
                  position: "sticky",
                  top: "0",
                  background: "#fff",
                  zIndex: 20,
                },
              }}
              aria-label="simple table"
            >
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
                      {task.status ? (
                        <Typography
                          variant="h6"
                          sx={{
                            textDecoration: "line-through",
                            opacity: 0.5,
                          }}
                        >
                          {task.title}
                        </Typography>
                      ) : (
                        <Typography variant="h6">{task.title}</Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "end" }}>
                      <ButtonGroup>
                        <Button
                          label="Complete"
                          className="complete-btn"
                          variant="outlined"
                          color="success"
                          onClick={() => handleComplete(task)}
                        >
                          {task.status ? (
                            <RemoveDoneOutlinedIcon />
                          ) : (
                            <DomainVerificationOutlinedIcon />
                          )}
                        </Button>
                        <Button
                          className="edit-btn"
                          variant="outlined"
                          onClick={() => handleEdit(task)}
                        >
                          <EditCalendarOutlinedIcon />
                        </Button>
                        <Button
                          className="trash-btn"
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(task.id)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
