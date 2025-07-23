import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { type RootState } from '../../entities/store/store'
import TaskItem from '../../widgets/TaskItem';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string>('')
  const [tagFilter, setTagFilter] = useState<string>('')

  const handleStatusChange = (
    _event: React.MouseEvent<HTMLElement>,
    newStatus: string | null
  ) => {
    setStatusFilter(newStatus)
  }

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriorityFilter(event.target.value)
  }

  const handleTagChange = (event: SelectChangeEvent) => {
    setTagFilter(event.target.value)
  }

  const resetFilters = () => {
    setStatusFilter(null)
    setPriorityFilter('')
    setTagFilter('')
  };

  const statuses = ['To Do', 'In Progress', 'Done']
  const priorities = ['Low', 'Medium', 'High']
  const tags = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test']

  const filteredTasks = tasks.filter(task => {
    return (
      (statusFilter === null || task.status === statusFilter) &&
      (priorityFilter === '' || task.priority === priorityFilter) &&
      (tagFilter === '' || task.tag === tagFilter)
    );
  });

  return (
    <Container sx={{ my: 3 }}>
      <Typography variant='h4' sx={{ 
        fontWeight: 'bold', 
        mb: 3,
        fontSize: { xs: '1.5rem', sm: '2rem' }
      }}>
        Менеджер задач
      </Typography>

      <Box sx={{ mb: 3, overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={handleStatusChange}
          aria-label="Фильтр по статусу"
          sx={{
            flexWrap: 'wrap',
          }}
        >
          {statuses.map(status => (
            <ToggleButton
              key={status}
              value={status}
              size={ 'medium'}
              sx={{ minWidth: 100 }}
            >
              {status}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Stack 
        direction={'row'}  
        sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          px: 2,
          mb: 4
         }}
        alignItems={'flex-start'}
      >
        <FormControl sx={{ width: {
          xs: 1,
          md: 200
        } }}>
          <InputLabel size={'medium'}>Приоритет</InputLabel>
          <Select
            value={priorityFilter}
            onChange={handlePriorityChange}
            label="Приоритет"
            size={'medium'}
          >
            <MenuItem value="">Все приоритеты</MenuItem>
            {priorities.map(priority => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: {
          xs: 1,
          md: 200
        } }}>
          <InputLabel size={'medium'}>Тег</InputLabel>
          <Select
            value={tagFilter}
            onChange={handleTagChange}
            label="Тег"
            size={'medium'}
          >
            <MenuItem value="">Все теги</MenuItem>
            {tags.map(tag => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button component={Link} to={'/task/new'} color='primary' sx={{
          color: 'white', 
          ":hover": { color: 'white' },
          my: 'auto'
        }}>
            <AddIcon  />
        </Button>

        {(statusFilter || priorityFilter || tagFilter) && (
          <Button
            variant="outlined"
            onClick={resetFilters}
            size={'medium'}
            sx={{ 
              alignSelf: 'center',
              mt: 0
            }}
          >
            Сбросить
          </Button>
        )}
      </Stack>

      {(statusFilter || priorityFilter || tagFilter) && (
        <Box sx={{ mb: 2, px: 2 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {statusFilter && (
              <Chip
                label={`Статус: ${statusFilter}`}
                onDelete={() => setStatusFilter(null)}
                size={'medium'}
              />
            )}
            {priorityFilter && (
              <Chip
                label={`Приоритет: ${priorityFilter}`}
                onDelete={() => setPriorityFilter('')}
                size={'medium'}
              />
            )}
            {tagFilter && (
              <Chip
                label={`Тег: ${tagFilter}`}
                onDelete={() => setTagFilter('')}
                size={'medium'}
              />
            )}
          </Stack>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              id={task.id}
              name={task.name}
              description={task.description}
              tag={task.tag}
              status={task.status}
              priority={task.priority}
            />
          ))
        ) : (
          <Typography variant="body1" sx={{ p: 2, textAlign: 'center' }}>
            Нет задач по выбранным фильтрам
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default TaskList;