import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { Layout } from './components/Layout';
import { ProtectedRouter } from './components/ProtectedRouter';
import { CreateTask } from './features/tasks/CreateTask';
import { EditTask } from './features/tasks/EditTask';
import { ListTask } from './features/tasks/ListTask';

export function App() {
  return (
    <Box>
      <Layout>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/tasks" element={ <ProtectedRouter> <ListTask /> </ProtectedRouter>} />
            <Route path="/tasks/create" element={ <ProtectedRouter> <CreateTask /> </ProtectedRouter> } />
            <Route path="/tasks/edit/:id" element={ <ProtectedRouter> <EditTask /> </ProtectedRouter>} />

            <Route path="*" element={ <Home /> } />
          </Routes>
        </Layout>
    </Box>
  );
}
