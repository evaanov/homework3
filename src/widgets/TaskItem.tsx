import { Link as RouterLink } from 'react-router-dom';
import type { Task } from "../entities/tasks";
import { Box, Button, Paper, Typography } from "@mui/material";
import { deleteTask } from '../store/tasksSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../entities/store/store';

const TaskItem: React.FC<Task> = (task: Task) => { 
    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteTask = () => { 
        dispatch(deleteTask(task.id))
    } 
    
    const statusElement = () => {
        switch(task.status) {
        case "To Do":
            return (<Typography sx={{ p: 0.5 ,bgcolor: "primary.light", borderRadius: 2, fontSize: 14 }}>
                To Do
            </Typography>)
        case "In Progress":
            return (<Typography sx={{ p: 0.5 ,bgcolor: "primary.light", borderRadius: 2, fontSize: 14 }}>
                In Progress
            </Typography>)
        case "Done":
            return (<Typography sx={{ p: 0.5 ,bgcolor: "primary.light", borderRadius: 2, fontSize: 14 }}>
                Done
            </Typography>)
        }
    }

    const priorityElement = () => {
        switch(task.priority) {
        case "High":
            return (<Typography sx={{ p: 0.5 ,bgcolor: "#e06969", color: "#8a0606", borderRadius: 2, fontSize: 14 }}>
                High
            </Typography >)
        case "Medium":
            return (<Typography sx={{ p: 0.5 ,bgcolor: "#ff8e3d", color: "#a64500", borderRadius: 2, fontSize: 14 }}>
                Medium
            </Typography>)
        case "Low":
            return (<Typography sx={{ p: 0.5 ,bgcolor: "#81d681", color: "#246924", borderRadius: 2, fontSize: 14 }}>
                Low
            </Typography>)
        }
    }

    return (
        <>
            <Paper elevation={10} key={task.id} sx={{
                width: { xs: 1, md: 340 },
                display: "flex",
                flexDirection: 'column',
                gap: 2,
                borderRadius: 2,
                m: 'auto'
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    m: 2
                }}>
                    <Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                        }}>
                            <Typography variant="h5" sx={{ textAlign: "left", fontWeight: 'bold' }}>{task.name}</Typography>
                            <Typography sx={{ textAlign: "left", height: 60, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{task.description}</Typography>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 1
                            }}>
                                {statusElement()}
                                {priorityElement()}
                                <Typography sx={{ p: 0.5 ,bgcolor: "primary.light", borderRadius: 2, fontSize: 14 }}>
                                    {task.tag}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1, justifyContent: "flex-end" }}>
                            <Button component={RouterLink} to={`/task/${task.id}`} color='primary' sx={{
                                color: 'white',
                                ":hover": { color: 'white' }
                            }}>
                                Редактировать
                            </Button>
                        <Button variant="contained" onClick={handleDeleteTask} sx={{ bgcolor: 'black' }}>Удалить</Button>
                    </Box>
                </Box>
            </Paper>
        </>
    )
}

export default TaskItem