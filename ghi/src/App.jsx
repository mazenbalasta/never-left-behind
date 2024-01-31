import './App.css';
import { Footer, Nav, Resources, VeteranSignup, PartnerSignup, Login } from './components';
import HomePage from './HomePage';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import { BrowserRouter } from 'react-router-dom'


function App() {

    const baseUrl = import.meta.env.VITE_API_HOST

    return (
        <>
            <AuthProvider baseUrl={baseUrl}>
                <BrowserRouter>
                    <Nav />
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
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App
