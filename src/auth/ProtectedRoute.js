import { Outlet, Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ users }) => {
    let location = useLocation()

    return users ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace state={{ path: location.pathname }} />
    )
}

export default ProtectedRoute
