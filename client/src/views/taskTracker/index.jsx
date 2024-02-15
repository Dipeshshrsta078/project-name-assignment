import { Box, Card, Container, Paper, Stack, Typography } from "@mui/material";
import { TaskList } from "../../components/TaskList";
import { TaskForm } from "../../components/TaskForm";
import { useEffect, useState } from "react";

const baseUrl = "http:localhost:4000"
export const TaskTracker = () => {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    getLocalTasks();
  }, []);

  useEffect(() => {
    handleFilter();
    saveLocalTasks();
  }, [tasks, status]);
  const handleFilter = () => {
    switch (status) {
      case "completed":
        setFilteredTasks(tasks.filter((task) => task.completed === true));
        break;
      case "uncompleted":
        setFilteredTasks(tasks.filter((task) => task.completed === false));
        break;
      default:
        setFilteredTasks(tasks);
    }
  };
  const saveLocalTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  const getLocalTasks = () => {
    if (localStorage.getItem("tasks") === null) {
      localStorage.setItem("tasks", JSON.stringify([]));
    } else {
      let localTask = JSON.parse(localStorage.getItem("tasks"));
      setTasks(localTask);
    }
  };

  return (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      <Card
        sx={{
          bgcolor: "#f4f4f4",
          maxWidth: "80%",
          height: "80vh",
          p: 2,
          minWidth: 768,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h3">Task tracker Management</Typography>
          <TaskForm
            inputText={inputText}
            tasks={tasks}
            setTasks={setTasks}
            setInputText={setInputText}
            status={status}
            setStatus={setStatus}
          />
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            setStatus={setStatus}
            filteredTasks={filteredTasks}
            setInputText={setInputText}
          />
        </Stack>
      </Card>
    </Box>
  );
};
