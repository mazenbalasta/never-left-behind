import './App.css';
import { Footer, Nav, Resources, VeteranSignup, PartnerSignup, Login } from './components';
import { MessageForm, ListMessages, EditMessage, DeleteMessage } from './components/messages';
import HomePage from './HomePage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'


function App() {

    const baseUrl = import.meta.env.VITE_API_HOST

    return (
        <main className="relative bg-[#282c34]">
            <section>
                <AuthProvider baseUrl={baseUrl}>
                    <BrowserRouter>
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
                                    {/* <Route path="/messages" element={<ListMessages />} >
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
                                    </Route> */}
                                    <Route
                                        path="/messages"
                                        // element={<ListMessages />}
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
                                    <Route path="/login" element={<Login />} />
                                </Routes>
                            </div>
                        </section>
                        <section>
                            <Footer />
                        </section>
                    </BrowserRouter>
                </AuthProvider>
            </section>
        </main>
    )
}

export default App
