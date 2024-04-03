import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Button,
  Typography,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useUser from "../../hooks/useUser";
import AddTodoModal from "../../components/modals/AddTodoModal";
import TaskCard from "../../components/TaskCard";
import { deleteTask, fetchTasks, toggleTaskStatus } from "../../api/tasks";

function Todos() {
  const [allTasks, setAllTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUser();
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dueDateFilter, setDueDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadTasks = async () => {
    if (user) {
      const fetchedTasks = await fetchTasks(user.id);
      setAllTasks(fetchedTasks);
    }
  };
  useEffect(() => {
    loadTasks();
  }, []);

  const resetFilters = () => {
    setSortOrder("asc");
    setStatusFilter("");
    setPriorityFilter("");
    setDueDateFilter("");
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    if (value && !searchTerm) {
      resetFilters();
    }
    setSearchTerm(value);
  };

  const tasks = useMemo(() => {
    return allTasks
      .filter((task) => {
        return (
          (statusFilter === "" ||
            (statusFilter === "done" ? task.status : !task.status)) &&
          (priorityFilter === "" || task.priority === priorityFilter) &&
          (dueDateFilter === "" || task.dueDate === dueDateFilter) &&
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [
    allTasks,
    sortOrder,
    statusFilter,
    priorityFilter,
    dueDateFilter,
    searchTerm,
  ]);

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleToggleTaskStatus = async (taskId) => {
    await toggleTaskStatus(taskId);
    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: !task.status } : task
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Welcome Back, {user?.firstName} {user?.lastName}
      </Typography>
      <Stack
        direction="row"
        mb={2}
        justifyContent="left"
        flexWrap={"wrap"}
        gap={2}
      >
        <TextField
          label="Search Tasks By Title"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "auto", flexGrow: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort Order</InputLabel>
          <Select
            value={sortOrder}
            label="Sort Order"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="notDone">Not Done</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priorityFilter}
            label="Priority"
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Due Date"
          type="date"
          size="small"
          value={dueDateFilter}
          onChange={(e) => setDueDateFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ width: "auto" }}
        />
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Task
        </Button>
      </Stack>
      <AddTodoModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        fetchTasks={loadTasks}
      />
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            toggleTaskStatus={() => handleToggleTaskStatus(task.id)}
            deleteTask={() => handleDeleteTask(task.id)}
          />
        ))
      ) : (
        <Typography variant="h4" mt={5} textAlign={"center"} gutterBottom>
          No Tasks To Display
        </Typography>
      )}
    </Container>
  );
}

export default Todos;
