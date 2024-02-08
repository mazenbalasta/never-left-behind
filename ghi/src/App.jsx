import './App.css';
import { Footer, Nav, Resources, VeteranSignup, PartnerSignup, Login} from './components';
import HomePage from './HomePage';
import Events from './Events';
import EventForm from './EventForm';
import Chat from './Chat';
import AboutUs from './AboutUs';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import { ListMessages } from './components/messages';
import MembershipBenefits from './components/MembershipBenefits';


function App() {

    const baseUrl = import.meta.env.VITE_API_HOST

    return (
        <main className="relative min-h-screen min-w-full flex flex-col items-center">

            <section>
                <AuthProvider baseUrl={baseUrl}>
                    <Nav />
                    <section>
                        <div className='bg-gradient-to-r from-[#282c34] via-[#50555c] to-[#a4a9af]'>
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
                                <Route path="/messages" element={<ListMessages />} />
                                <Route path="/events" element={<Events />} />
                                <Route path="/createEvent" element={<EventForm />} />
                                <Route path="/chat" element={<Chat />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/aboutus" element={<AboutUs />} />
                                <Route path="/benefits" element={<MembershipBenefits />} />
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
