import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet, Navigate} from 'react-router-dom'

export default function PrivateRoute() {
    const { currentUser } = useAuth()    
    return currentUser ? <Outlet /> : <Navigate to="movie-finder/login" />
}
