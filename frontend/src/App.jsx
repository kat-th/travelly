import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import { AllSpots, ManageSpot } from './components/Spots';
import SpotDetail from './components/SpotDetail';
import { CreateSpotPage, UpdateSpotPage } from './components/SpotForms';

function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && <Outlet />}
        </>
    );
}

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <AllSpots />,
            },
            {
                path: '/spots/:spotId',
                element: <SpotDetail />,
            },
            {
                path: '/create-spot',
                element: <CreateSpotPage />,
            },
            {
                path: '/current',
                element: <ManageSpot />,
            },
            {
                path: '/spots/:spotId/edit',
                element: <UpdateSpotPage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
