// This makes VSCode check types as if you are using TypeScript
//@ts-check
import { useState, useEffect } from 'react'
import ErrorNotification from './ErrorNotification'
import './App.css'
import Resources from './Resources';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Nav, Footer } from "./components";
import HomePage from "./sections/HomePage";

// All your environment variables in vite are in this object
console.table(import.meta.env)

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },

    {
        path: '/resources',
        element: <Resources />,

    }

]);


function App() {


    return (
        <main className='relative bg-[#282c34]'>
            <section>
                <Nav />
            </section>
            <section>
                <div className="container mx-auto">
                    <RouterProvider router={router} />
                </div>
            </section>
            <section>
                <Footer />
            </section>
        </main>
    )
}

export default App
