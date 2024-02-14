import './App.css';
import { Footer, Nav, Resources, VeteranSignup, PartnerSignup, ActivitiesForm, ActivitiesList, Login, Jobslist, CreateJob, GetLocalBars, PrivacyPolicy} from './components';
import HomePage from './HomePage';
import Events from './Events';
import EventForm from './EventForm';
import Chat from './Chat';
import AboutUs from './AboutUs';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import { ListMessages } from './components/messages';
import MembershipBenefits from './components/MembershipBenefits';


function App() {

    const baseUrl = "https://never-left-behind-veterans-r-us-f6bdcd9fc60e57def2a9122364944c2.gitlab.io/"


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
                                <Route path='activitiesForm' element={<ActivitiesForm />} />
                                <Route path="/activities" element={<ActivitiesList />} />
                                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                                <Route path="/bars" element={<GetLocalBars />} />
                                <Route path="/messages" element={<ListMessages />} />
                                <Route
                                    path="/events"
                                    element={<Events />}
                                />
                                <Route path="/createEvent" element={<EventForm />} />
                                <Route
                                    path="/chat"
                                    element={<Chat />}
                                />
                                <Route
                                    path="/login"
                                     element={<Login />}
                                />
                                <Route
                                    path="/jobs"
                                     element={<Jobslist />}
                                />
                                <Route
                                    path='/jobs/create'
                                    element={<CreateJob />}
                                />
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
