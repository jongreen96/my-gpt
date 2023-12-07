import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Root from './routes/root';
import ErrorPage from './routes/error-page';
import HomePage from './routes/home-page';
import SignUp from './routes/sign-up';
import SignIn from './routes/sign-in';
import Settings from './routes/settings';
import Chat from './routes/chat';
import Verification from './routes/verification';
import ChangePassword from './routes/changePassword';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/sign-up',
                element: <SignUp />,
            },
            {
                path: '/sign-in',
                element: <SignIn />,
            },
            {
                path: '/settings',
                element: <Settings />,
            },
            {
                path: '/chat',
                element: <Chat />,
            },
            {
                path: '/verification',
                element: <Verification />,
            },
            {
                path: '/change-password',
                element: <ChangePassword />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
