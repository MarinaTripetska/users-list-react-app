import {createBrowserRouter, Navigate} from 'react-router';
import {lazy} from 'react';
import Layout from '@/Layout';

const AboutPage = lazy(() => import('@/pages/AboutPage'));
const UsersPage = lazy(() => import('@/pages/UsersPage'));
const UserDetailsPage = lazy(() => import('@/pages/UserDetailsPage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));


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
                    path: "/users/:id",
                    Component: UserDetailsPage,
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