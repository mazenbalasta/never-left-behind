// This makes VSCode check types as if you are using TypeScript
//@ts-check
// import { useState, useEffect } from 'react';
// import ErrorNotification from './ErrorNotification';
import './App.css';
import { Footer, Nav, Resources, VeteranSignup, PartnerSignup, Login} from './components';
import HomePage from './HomePage';
import Events from './Events';
import Chat from './Chat';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import { BrowserRouter } from 'react-router-dom'


// All your environment variables in vite are in this object
console.table(import.meta.env)
// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST
if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}
// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <HomePage />,
//     },
//     {
//         path: '/resources',
//         element: <Resources />,
//     },
//     {
//         path: '/signup',
//         // element: <Signup />,
//         children: [
//             {
//                 path: 'signup/veteran',
//                 element: <VeteranSignup />,
//             },
//             {
//                 path: 'signup/partner',
//                 element: <PartnerSignup />,
//             },
//         ],
//     },
// ])


function App() {

    const baseUrl = import.meta.env.VITE_API_HOST

    return (

        // <main className="relative">
        //     <section>
        //         <Nav />
        //     </section>
        //     <section>
        //             <div>
        //                 <RouterProvider router={router} />
        //             </div>
        //     </section>
        //     <section>
        //         <Footer />
        //     </section>
        // </main>

        <>
            <AuthProvider baseUrl={baseUrl}>
                <BrowserRouter>
                    <Nav />

                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/resources" element={<Resources />} />
                            <Route path="/signup">
                                <Route
                                    path="veteran"
                                    element={<VeteranSignup />}
                                />
                                <Route
                                    path="partner"
                                    element={<PartnerSignup />}
                                />
                            </Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/chat" element={<Chat />} />
                        </Routes>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App
