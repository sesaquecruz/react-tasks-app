import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { instantFormat } from '../../../config/timezone';
import { Task, TaskPriority, TaskStatus } from '../../../types/Task';

type Props = {
  task: Task
  title: string,
  isDisable: boolean,
  onSubmit: (task: Task) => void,
}

export function TaskForm(props: Props) {
  const [task, setTask] = useState<Task>(props.task);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.onSubmit(task);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 3
      }}
    >
      <Box maxWidth="90%">
        <Paper>
          <Box pl={6} pt={5} pb={3}>
            <Typography variant="h5">{ props.title }</Typography>
          </Box>
          <Box pl={6} pr={6} pb={5}>
            <form onSubmit={onSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="name"
                      label="Name"
                      value={task.name}
                      onChange={(e) => {setTask({...task, name: e.target.value})}}
                    >
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="description"
                      label="Description"
                      value={task.description}
                      onChange={(e) => {setTask({...task, description: e.target.value})}}
                    >
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="task-priority">Priority</InputLabel>
                    <Select
                      labelId="task-priority"
                      value={task.priority}
                      label="Priority"
                      onChange={(e) => {setTask({...task, priority: e.target.value as TaskPriority})}}
                    >
                      <MenuItem value="HIGH">High</MenuItem>
                      <MenuItem value="NORMAL">Normal</MenuItem>
                      <MenuItem value="LOW">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="task-status">Status</InputLabel>
                    <Select
                      labelId="task-status"
                      value={task.status}
                      label="Status"
                      onChange={(e) => {setTask({...task, status: e.target.value as TaskStatus})}}
                    >
                      <MenuItem value="PENDING">Pending</MenuItem>
                      <MenuItem value="COMPLETED">Completed</MenuItem>
                      <MenuItem value="CANCELLED">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={dayjs.locale()}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DateTimePicker
                        label="Due Date"
                        ampm={false}
                        value={dayjs(task.due_date)}
                        onChange={(v) => { if (v !== undefined)
                          setTask({...task, due_date: v!.utc().format(instantFormat)})
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/tasks"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={props.isDisable}
                    >
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
