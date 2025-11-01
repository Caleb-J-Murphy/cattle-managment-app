import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { AnimalListPage } from './pages/AnimalList.page';
import { CreateAnimalPage } from './pages/CreateAnimal.page';
import { DashboardPage } from './pages/Dashboard.page';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'createAnimal', element: <CreateAnimalPage /> },
      { path: 'animalList', element: <AnimalListPage /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
