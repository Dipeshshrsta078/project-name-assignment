import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../App";
export const TaskForm = ({
  tasks,
  setTasks,
  setInputText,
  editItemId,
  inputText,
  status,
  setFilteredTasks,
  setEditItemId,
  setStatus,
}) => {
/* states */
  const [open, setOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");
  const [error, setError] = useState("");

  /* Event handlers */

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!inputText) {
        throw "Task cannot be empty!!";
      }
      let response;
      if (editItemId) {
        console.log("here")
        response = await axios.put(`${baseUrl}/tasks/${editItemId}`, {
          title: inputText,
        });
        setTasks(response?.data?.data);
        setFilteredTasks(response?.data?.data);
        setEditItemId("")
      } else {
        response = await axios.post(`${baseUrl}/tasks`, {
          title: inputText,
          status: false,
        });
        const result = await axios.get(`${baseUrl}/tasks`);
        setTasks(result?.data?.data);
        setFilteredTasks(result?.data?.data);
      }
      console.log(response);
      setInputText("");

      setOpen(true);
      setSnackbarMsg(response.data.msg);
      setSnackbarColor("green");
    } catch (err) {
      setOpen(true);
      console.log(err); 
      setSnackbarMsg(err.error || err);
      setSnackbarColor("red");
    }
  };

  return (
    <form>
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
      <Grid container direction={"row"} justifyContent={"center"}>
        <Grid item xs={8}>
          <TextField
            id="outlined-basic"
            label="Add task"
            variant="outlined"
            size="large"
            value={inputText}
            fullWidth
            onChange={handleChange}
            sx={{ backgroundColor: "#fff", mr: 1 }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddBoxOutlinedIcon />}
            sx={{ height: "54px" }}
          >
            <Typography variant="h6" sx={{ textTransform: "initial" }}>
              {editItemId !== "" ? "Save" : "Add"}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
