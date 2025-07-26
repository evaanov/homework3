import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Task } from "@entities/tasks";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Container,
  CircularProgress,
} from "@mui/material";
import { useTasks } from "@entities/store/useTask";

const TaskForm = () => {
  const { id } = useParams<{ id: string }>()
  const [state] = useState<string>(id ? 'editing' : 'creation')
  const { tasks, createTask, updateTask, error } = useTasks()
  const navigate = useNavigate()

  const task = tasks.find((t: Task) => t.id === id)

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string | undefined>("")
  const [status, setStatus] = useState<string>("")
  const [priority, setPriority] = useState<string>("")
  const [tag, setTag] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description || "");
      setStatus(task.status);
      setPriority(task.priority);
      setTag(task.tag);
      setDate(task.date)
    }
  }, [task]);

  if (!task && state === 'editing')
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" color="error" gutterBottom>
          Задача не найдена
        </Typography>
      </Container>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (state === 'editing') { 
        if (task) { 
          await updateTask(task.id, { name, description, status, priority, tag, date })
        }
      } else {
        await createTask({name, description, status, priority, tag, date})
      }
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusOptions = [
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Done", label: "Done" },
  ];

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const tagOptions = [
    { value: "Feature", label: "Feature" },
    { value: "Bug", label: "Bug" },
    { value: "Documentation", label: "Documentation" },
    { value: "Refactor", label: "Refactor" },
    { value: "Test", label: "Test" },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Панель редактирования задач
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Название задачи"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
            disabled={isSubmitting}
          />

          <TextField
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            disabled={isSubmitting}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Статус</InputLabel>
            <Select
              value={status}
              label="Статус"
              onChange={(e) => setStatus(e.target.value as string)}
              disabled={isSubmitting}
              sx={{ textAlign: "left" }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Приоритет</InputLabel>
            <Select
              value={priority}
              label="Приоритет"
              onChange={(e) => setPriority(e.target.value as string)}
              disabled={isSubmitting}
              sx={{ textAlign: "left" }}
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Тег</InputLabel>
            <Select
              value={tag}
              label="Тег"
              onChange={(e) => setTag(e.target.value as string)}
              disabled={isSubmitting}
              sx={{ textAlign: "left" }}
            >
              {tagOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Дата"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value as string)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            margin="normal"
            disabled={isSubmitting}
          />

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              disabled={isSubmitting}
              sx={{ color: "white" }}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? "Сохранение..." : "Сохранить"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskForm;