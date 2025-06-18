import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Login from '../components/pages/Login';
import TopicTabs from '../components/topics/TopicTabs';
import App from '../App';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Login />} />
      <Route path="/topics" element={<TopicTabs />} />
    </Route>
  )
);

export default router;
