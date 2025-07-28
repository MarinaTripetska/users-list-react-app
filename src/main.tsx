import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router";
import {Provider} from 'react-redux';
import {Toaster} from 'react-hot-toast';
import {SpinnerCircular} from 'spinners-react';
import store from '@/store';
import '@/styles/index.scss'
import router from "@/routes.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Suspense fallback={<div className="spinner-overlay"><SpinnerCircular size={100}/></div>}>
            <Toaster/>

            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </Suspense>
    </StrictMode>
)
