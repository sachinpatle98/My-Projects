import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Loginpage from '../pages/Loginpage'
import Signuppage from '../pages/Signuppage'
import Notespage from '../pages/Notespage'
import PrivateRoute from './PrivateRoute'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path="register" element={<Signuppage />} />
            <Route path="login" element={<Loginpage />} />
            <Route path="notes" element={<PrivateRoute><Notespage /></PrivateRoute>}></Route>
        </Routes>
    )
}

export default AllRoutes
