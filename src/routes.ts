import { createBrowserRouter, Navigate } from 'react-router';
import Layout from './Layout';
import AboutPage from './pages/AboutPage';
import UsersPage from './pages/UsersPage';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
        {
            path: "/",
            Component: Layout,
            children: [
                {
                    index: true,
                    Component: () => Navigate({to: "/about", replace: true}),
                },
                {
                    path: "/about",
                    Component: AboutPage,
                },
                {
                    path: "/users",
                    Component: UsersPage,
                },
                {
                    path: '*',
                    Component: ErrorPage,
                },
            ],
        },
    ],
    {
        basename: import.meta.env.BASE_URL,
    });

export default router;