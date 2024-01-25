import './App.css'
import Nav from './Nav'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';
import Construct from './Construct';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/construct',
        element: <Construct />,
    }

]);


function App() {

    return (
        <div>
            <>
             <Nav/>
            <div className="container">
                <RouterProvider router={router} />
            </div>
            </>
        </div>

    )
}

export default App
