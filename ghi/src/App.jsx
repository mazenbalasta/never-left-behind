// This makes VSCode check types as if you are using TypeScript
//@ts-check
// import { useState, useEffect } from 'react';
// import ErrorNotification from './ErrorNotification';
import './App.css';
import { Footer, Nav, Resources, VeteranSignup, PartnerSignup,
    Dashboard, UpdateMessage, DeleteMessage} from './components';
import HomePage from './HomePage';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CreateMessage } from './components/messages';


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
                <Nav />
            </section>
            <section>
                <div className="App-header">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/signup">
                            <Route path="veteran" element={<VeteranSignup />} />
                            <Route path="partner" element={<PartnerSignup />} />
                        </Route>
                        <Route path="/messages" element={<Dashboard />} >
                            <Route path="create" element={<CreateMessage onMessageSubmit={undefined}/>} />
                            <Route path=":id/update" element={<UpdateMessage onMessageSubmit={undefined}/>} />
                            <Route path=":id/delete" element={<DeleteMessage />} />
                        </Route>
                    </Routes>
                </div>
            </section>
            <section>
                <Footer />
            </section>
        </main>
    )
}

export default App
