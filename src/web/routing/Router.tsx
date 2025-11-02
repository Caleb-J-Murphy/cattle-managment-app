import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { routes } from './constants';

// Lazy load pages
const HomePage = React.lazy(() => import('../pages/Home.page'));
const DashboardPage = React.lazy(() => import('../pages/Dashboard.page'));
const CreateAnimalPage = React.lazy(() => import('../pages/CreateAnimal.page'));
const AnimalListPage = React.lazy(() => import('../pages/AnimalList.page'));
const ViewAnimalPage = React.lazy(() => import('../pages/ViewAnimal.page'));

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
