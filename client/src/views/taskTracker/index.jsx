import { Box, Card, Container, Paper, Stack, Typography } from "@mui/material";
import { TaskList } from "../../components/TaskList";
import { TaskForm } from "../../components/TaskForm";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../App";

export const TaskTracker = () => {
  /*  states  */
  const [inputText, setInputText] = useState("");
  const [editItemId, setEditItemId] = useState("");

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);

  /* API call */
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/tasks`);
      setTasks(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [tasks]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilter();
    saveLocalTasks();
  }, [tasks, status]);

  /* Event handlers */
  const handleFilter = () => {
    switch (status) {
      case "completed":
        setFilteredTasks(tasks.filter((task) => task.status === true));
        break;
      case "incomplete":
        setFilteredTasks(tasks.filter((task) => task.status === false));
        break;
      default:
        setFilteredTasks(tasks);
    }
  };
  const saveLocalTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return (
    <Box>
      <Card
        sx={{
          bgcolor: "#f4f4f4",
          maxWidth: "750px",
          p: 2,
          margin: '40px auto'
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h3">Task Tracker Management</Typography>
          <TaskForm
            inputText={inputText}
            tasks={tasks}
            editItemId={editItemId}
            setEditItemId={setEditItemId}
            setTasks={setTasks}
            setInputText={setInputText}
            setFilteredTasks={setFilteredTasks}
            status={status}
            setStatus={setStatus}
          />
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            setEditItemId={setEditItemId}
            setStatus={setStatus}
            filteredTasks={filteredTasks}
            setFilteredTasks={setFilteredTasks}
            setInputText={setInputText}
          />
        </Stack>
      </Card>
    </Box>
  );
};
