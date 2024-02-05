import './App.css';
import { Footer, Nav, Resources, VeteranSignup, PartnerSignup, ActivitiesForm, ActivitiesList, Login} from './components';
import HomePage from './HomePage';
import Events from './Events';
import Chat from './Chat';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import { ListMessages, DeleteMessage, EditMessage, MessageForm } from './components/messages';


function App() {

    const baseUrl = import.meta.env.VITE_API_HOST

    return (
        <main className="relative bg-[#282c34]">
            <section>
                <AuthProvider baseUrl={baseUrl}>
                    <Nav />
                    <section>
                        <div className="App-header">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/resources"
                                    element={<Resources />}
                                />
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
                                <Route
                                    path="/messages/*"
                                    element={<ListMessages />}
                                >
                                    <Route
                                        path="create"
                                        element={<MessageForm />}
                                    />
                                    <Route
                                        path=":id/update"
                                        element={<EditMessage />}
                                    />
                                    <Route
                                        path=":id/delete"
                                        element={<DeleteMessage />}
                                    />
                                </Route>
                                <Route path="/events" element={<Events />} />
                                <Route path="/chat" element={<Chat />} />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </div>
                    </section>
                    <section>
                        <Footer />
                    </section>
                </AuthProvider>
            </section>
        </main>
    )
}

export default App
