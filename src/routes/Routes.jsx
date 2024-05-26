import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import Statistics from '../pages/DashBoard/Common/Statistics'
import AddRoom from '../pages/DashBoard/Host/AddRoom'
import MyListings from '../pages/DashBoard/Host/MyListings'
import Profile from '../pages/DashBoard/Common/Profile'
import ManageUsers from '../pages/DashBoard/Admin/ManageUsers'
import MyBookings from '../pages/DashBoard/Guest/MyBooking'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <PrivateRoute><RoomDetails /></PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path:'/dashboard',
    element:<Dashboard/>,
    children:[
      {
        index:true,
        element:<Statistics/>
      },
      {
        path:'add-room',
        element:<AddRoom/>
      },
      {
        path:'my-listings',
        element:<MyListings/>
      },
      {
        path:'/dashboard/profile',
        element:<Profile/>
      },
      {
        path:'/dashboard/manage-users',
        element:<ManageUsers/>
      },
      {
        path:'my-bookings',
        element:<MyBookings/>
      }
    ]
  }
])
