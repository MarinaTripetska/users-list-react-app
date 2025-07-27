import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router";
import {Provider} from 'react-redux';
import store from './store';
import './index.css'
import router from "./routes.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <Suspense fallback={<div>Ładowanie strony...</div>}>
                <RouterProvider router={router}/>
            </Suspense>
        </Provider>
    </StrictMode>
)
