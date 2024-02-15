import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Button, Grid, TextField, Typography } from "@mui/material";
export const TaskForm = ({
  tasks,
  setTasks,
  setInputText,
  inputText,
  status,
  setStatus,
}) => {
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    !inputText
      ? alert("Fill Task")
      : setTasks([
          ...tasks,
          {
            text: inputText,
            completed: true,
            id: Math.random() * 1000,
          },
        ]);
    setInputText("");
  };

  

  return (
    <form>
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
              Add
            </Typography>
          </Button>
        </Grid>
      </Grid>

     
    </form>
  );
};
