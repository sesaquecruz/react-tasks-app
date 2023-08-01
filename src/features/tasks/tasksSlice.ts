import { Page, Task, TaskQuery } from "../../types/Task";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = '/tasks';

function parseQueryParams(params: any) {
  return Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
}

function getTasks(query: TaskQuery) {
  const params = parseQueryParams(query).replaceAll('due_date', 'dueDate');
  return {
    url: params !== '' ? `${endpointUrl}?${params}`: endpointUrl,
    method: 'GET',
  }
}

function getTask(id: string) {
  return {
    url: `${endpointUrl}/${id}`,
    method: 'GET'
  }
}

function createTask(task: Task) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: task,
  }
}

function updateTask(task: Task) {
  return {
    url: endpointUrl,
    method: 'PUT',
    body: task,
  }
}

function deleteTask(id: string) {
  return {
    url: endpointUrl,
    method: 'DELETE',
    body: {
      task_id: id
    }
  }
}

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getTasks: query<Page, TaskQuery>({
      query: getTasks,
      providesTags: ['Tasks'],
    }),
    getTask: query<Task, string>({
      query: getTask
    }),
    createTask: mutation<void, Task>({
      query: createTask,
      invalidatesTags: ['Tasks'],
    }),
    updateTask: mutation<void, Task>({
      query: updateTask,
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: mutation<void, string>({
      query: deleteTask,
      invalidatesTags: ['Tasks'],
    })
  })
});

export const { 
  useGetTasksQuery, 
  useGetTaskQuery, 
  useCreateTaskMutation, 
  useUpdateTaskMutation, 
  useDeleteTaskMutation 
} = tasksApiSlice;
