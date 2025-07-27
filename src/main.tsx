import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router";
import {Provider} from 'react-redux';
import store from '@/store';
import '@/index.css'
import router from "@/routes.ts";
import {SpinnerCircular} from 'spinners-react';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Suspense fallback={<SpinnerCircular size={100}/>}>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </Suspense>
    </StrictMode>
)
