import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Layout from './components/Layout';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import GetStartedPage from './pages/GetStartedPage.tsx';
import AppAuth from './classes/AppAuth.tsx';
import HomePage from './pages/HomePage.tsx';
import AppStorage from './classes/AppStorage.tsx';
import type { User } from './classes/User.tsx';
import HitRateLimitPage from './pages/HitRateLimitPage.tsx';
import CoursePage from './pages/CoursePage.tsx';

function RootScreen() {
  const authenticated = AppAuth.isAuthenticated();
  return authenticated ? <Navigate to="/home" /> : <Navigate to="/get-started" />;
}

function AuthenticatedOnlyRoutes () {
  const authenticated = AppAuth.isAuthenticated();
  const user: User | null = AppStorage.getUser();
  return authenticated
    ? (user?.hitRateLimit ? <Navigate to="/hit-rate-limit" /> : <Outlet />)
    : <Navigate to="/get-started" />;
}

function UnauthenticatedOnlyRoutes () {
  const authenticated = AppAuth.isAuthenticated();
  return !authenticated ? <Outlet /> : <Navigate to="/home" />;
}

let router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <RootScreen/>,
      },
      {
        element: <UnauthenticatedOnlyRoutes />,
        children: [
          {
            path: "/get-started",
            element: <GetStartedPage/>,
          },
        ]
      },
      {
        element: <AuthenticatedOnlyRoutes />,
        children: [
          {
            path: "/home",
            element: <HomePage />,
          },
          {
            path: "/course/:courseIndex",
            element: <CoursePage />
          },
          {
            path: "/hit-rate-limit",
            element: <HitRateLimitPage />,
          },
        ]
      }
    ],
  },
]);



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </StrictMode>,
);