import {createBrowserRouter} from "react-router";
import App from './App.tsx'

const router = createBrowserRouter([
        {
            path: "/",
            Component: App,

        },
    ],
    {
        basename: import.meta.env.BASE_URL,
    });

export default router;