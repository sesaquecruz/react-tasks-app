import { Box, Button, CircularProgress, Dialog, DialogContentText, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Task, TaskQuery, isTaskQuerySort, isTaskQueryDir } from '../../types/Task';
import { TaskTable } from './components/TaskTable';
import { useDeleteTaskMutation, useGetTasksQuery } from './tasksSlice';
import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

export function ListTask() {
  const [ query, setQuery ] = useState<TaskQuery>({ page: 0, size: 5, term: '', sort: 'name', dir: 'asc' });
  const { data, isFetching, error } = useGetTasksQuery(query);
  const [ deleteTask, deleteTaskStatus ] = useDeleteTaskMutation();
  const [ deleteTaskInfo, setDeleteInfo ] = useState<Task>();
  const [ deleteTaskDialog, setDeleteTaskDialog ] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteDialogOpen = (id: string) => {
    const task = data!.items.find(t => t.id === id);
    setDeleteInfo(task);
    setDeleteTaskDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteTaskDialog(false);
  };

  const handleDeleteDialogConfirm = async () => {
    setDeleteTaskDialog(false);
    await deleteTask(deleteTaskInfo!.id);
  };

  useEffect(() => {
    if (error)
      enqueueSnackbar('Failed to load tasks!', { variant: 'error' });
  }, [error, enqueueSnackbar])

  useEffect(() => {
    if (deleteTaskStatus.isSuccess)
      enqueueSnackbar("Task deleted!", { variant: "success" });
    if (deleteTaskStatus.error)
      enqueueSnackbar("Failed to delete task!", { variant: "error" });
  }, [deleteTaskStatus, enqueueSnackbar])

  const handlePaginationChange = (p: GridPaginationModel) => {
    setQuery({
      ...query,
      page: p.page,
      size: p.pageSize,
    });
  }

  const handleFilterChange = (f: GridFilterModel) => {
    if (f.quickFilterValues) {
      const term = f.quickFilterValues.join(' ');
      setQuery({
        ...query,
        term: term,
      });
    }
  }

  const handleSortChange = (s: GridSortModel) => {
    if (s.length !== 0) {
      const sort = s[0].field;
      const dir = s[0].sort!.toString();

      if (isTaskQuerySort(sort) && isTaskQueryDir(dir)) {
        setQuery({
          ...query,
          sort: sort,
          dir: dir,
        });
      }
    }
  }

  return (
    <Box sx={{ width: 'lg', pt: 3, pl: 8, pr: 8 }}>
      <Dialog open={deleteTaskDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText color="secondary">{ deleteTaskInfo?.name ?? '' }</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleDeleteDialogClose} autoFocus
            >
              Back
            </Button>
          <Button 
            variant="contained" 
            color="warning"
            onClick={handleDeleteDialogConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          style={{ marginBottom: "1rem" }}
          component={Link}
          to="/tasks/create"
        >
          New Task
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        { data ? 
          <TaskTable 
            data={data}
            isFetching={isFetching}
            pageSizes={[5, 10, 25, 50]}
            pageSize={query.size!}
            handlePaginationChange={handlePaginationChange}
            handleFilterChange={handleFilterChange}
            handleSortChange={handleSortChange}
            handleDelete={handleDeleteDialogOpen}
          />
          :
          <CircularProgress />
        }
      </Box>
    </Box>
  );
}
