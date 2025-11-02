import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { AnimalListPage } from '../pages/AnimalList.page';
import { CreateAnimalPage } from '../pages/CreateAnimal.page';
import { DashboardPage } from '../pages/Dashboard.page';
import { HomePage } from '../pages/Home.page';
import { ViewAnimalPage } from '../pages/ViewAnimal.page';
import { routes } from './constants';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: routes.home, element: <HomePage /> },
      { path: routes.dashboard, element: <DashboardPage /> },
      { path: routes.createAnimal, element: <CreateAnimalPage /> },
      { path: routes.animalList, element: <AnimalListPage /> },
      { path: `${routes.viewAnimal}/:id`, element: <ViewAnimalPage /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
