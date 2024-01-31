// This makes VSCode check types as if you are using TypeScript
//@ts-check
// import { useState, useEffect } from 'react';
// import ErrorNotification from './ErrorNotification';
import './App.css';
import { Footer, Nav, Resources, VeteranSignup, PartnerSignup } from './components';
import { MessageForm, ListMessages, EditMessage, DeleteMessage } from './components/messages';
import HomePage from './HomePage';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
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



function App() {


    return (
        <main className='relative bg-[#282c34]'>
            <section>
                <AuthProvider baseUrl={'http://localhost:8000'}>
                <BrowserRouter>
                    <Nav />
            </section>
            <section>
                    <div className="App-header">
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
                        <Route path="/messages" element={<ListMessages />} >
                            <Route path="create" element={<MessageForm />} />
                            <Route path=":id/update" element={<EditMessage />} />
                            <Route path=":id/delete" element={<DeleteMessage />} />
                        </Route>
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </div>
            </section>
            <section>
                        <Footer />
            </section>
                </BrowserRouter>
            </AuthProvider>
        </main>
    )
}

export default App
