import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { instantFormat } from '../../config/timezone';
import { Task } from '../../types/Task';
import { TaskForm } from './components/TaskForm';
import { useCreateTaskMutation } from './tasksSlice';

export function CreateTask() {
  const [ createTask, createTaskStatus ] = useCreateTaskMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (task: Task) => {
    await createTask(task);
  }

  useEffect(() => {
    if (createTaskStatus.isSuccess) 
      enqueueSnackbar('Task created!', { variant: 'success' });
    if (createTaskStatus.error)
      enqueueSnackbar('Failed to create task!', { variant: 'error' });
  }, [createTaskStatus, enqueueSnackbar])

  const emptyTask: Task = {
    id: '',
    name: '',
    description: '',
    due_date: dayjs().utc().format(instantFormat),
    priority: 'NORMAL',
    status: 'PENDING',
  }

  return (
    <TaskForm
      task={emptyTask}
      title="Create Task"
      isDisable={createTaskStatus.isLoading}
      onSubmit={handleSubmit}
    />
  )
}
