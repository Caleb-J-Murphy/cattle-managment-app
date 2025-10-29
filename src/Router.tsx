import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard.page';
import { HomePage } from './pages/Home.page';
import { MainLayout } from './layout/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      // add more pages here
    ],
  },
]);


export function Router() {
  return <RouterProvider router={router} />;
}
