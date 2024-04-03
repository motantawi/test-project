import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
  Typography,
  FormHelperText,
} from "@mui/material";
import useUser from "../../hooks/useUser.jsx";
import { createTaskSchema } from "../../utils/Schema.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { addTask } from "../../api/tasks.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function AddTodoModal({ open, handleClose, fetchTasks }) {
  const { user } = useUser();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTaskSchema),
  });

  const handleAddTask = async (data) => {
    const { title, description, priority, dueDate } = data;
    const newTask = {
      title,
      description,
      priority,
      dueDate,
      userId: user.id,
      status: false,
    };

    try {
      await addTask(newTask);
      toast.success("Task added successfully");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("An error occurred while adding the task.");
    }

    reset();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={style}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleAddTask)}
      >
        <Typography variant="h6" component="h2">
          Add New Todo
        </Typography>

        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Title"
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ mt: 2 }}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Description"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{ mt: 2 }}
            />
          )}
        />

        <Controller
          name="priority"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.priority}>
              <InputLabel>Priority</InputLabel>
              <Select {...field} label="Priority" error={!!errors.priority}>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
              <FormHelperText>{errors.priority?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="dueDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Due Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
              sx={{ mt: 2 }}
            />
          )}
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Add Task
        </Button>
      </Box>
    </Modal>
  );
}

export default AddTodoModal;
