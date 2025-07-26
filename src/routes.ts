import { createBrowserRouter } from "react-router";
import App from './App.tsx'

let router = createBrowserRouter([
    {
        path: "/",
        Component: App,

    },
]);

export default router;