import { Box, CircularProgress } from '@mui/material';
import 'dayjs/locale/pt-br';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Task } from '../../types/Task';
import { TaskForm } from './components/TaskForm';
import { useGetTaskQuery, useUpdateTaskMutation, } from './tasksSlice';

export function EditTask() {
  const { data, isFetching, error } = useGetTaskQuery(useParams().id || "");
  const [ updateTask, updateTaskStatus ] = useUpdateTaskMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (task: Task) => {
    await updateTask(task);
  }

  useEffect(() => {
    if (updateTaskStatus.isSuccess)
      enqueueSnackbar('Task updated!', { variant: 'success' });
    if (updateTaskStatus.error)
      enqueueSnackbar('Failed to update task!', { variant: 'error' });
  }, [updateTaskStatus, enqueueSnackbar])

  useEffect(() => {
    if (error)
      enqueueSnackbar('Failed to load task!', { variant: 'error' });
  }, [error, enqueueSnackbar])

  return ( isFetching || !data ? 
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
      :
      <TaskForm
        task={data}
        title="Edit Task"
        isDisable={updateTaskStatus.isLoading}
        onSubmit={handleSubmit}
      />
  );
}
