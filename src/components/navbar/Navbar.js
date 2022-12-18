import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Log_out } from '../../redux/userSlice'
import Loginmodal from '../loginmodal/Loginmodal'
import Registermodel from '../register model/Registermodal'
import './navbar.css'

const Navbar = () => {
    const user = useSelector((state) => state.user.student?.name)
    const users = useSelector((state) => state.user.student)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            dispatch(Log_out())
            navigate('/')
            // let a = await axiosJWT.get('http://localhost:8000/api/user/')
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <>
            <div className="navbarcontainer container-fluid bg-light">
                <nav className="navbarnav navbar navbar-expand-md navbar-light">
                    <div className="navbar-brand">GSM</div>
                    <button
                        className="navbartoggler navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbaritems"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="navbarcollapse collapse navbar-collapse"
                        id="navbaritems"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    style={{
                                        textDecoration: 'none',
                                    }}
                                >
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item disabled">
                                <Link
                                    to="/materials"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Materials
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/attendance"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Attendance
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/fees"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Fees
                                </Link>
                            </li>
                            <li className="nav-item disabled">
                                <Link
                                    to="/onlineclass"
                                    style={{ textDecoration: 'none' }}
                                >
                                    OnlineClass
                                </Link>
                            </li>

                            {user && (
                                <>
                                    <li
                                        className="nav-item"
                                        style={{
                                            display: users.isAdmin
                                                ? ''
                                                : 'none',
                                        }}
                                    >
                                        <Link
                                            to="/admin"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Admin
                                        </Link>
                                    </li>
                                    <li
                                        className="nav-item"
                                        style={{
                                            display: users.isAdmin
                                                ? ''
                                                : 'none',
                                        }}
                                    >
                                        <Link
                                            to="/student"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Students
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>

                <div className="navbarlogin">
                    {!user ? (
                        <>
                            <span
                                className="text-muted"
                                data-toggle="modal"
                                data-target="#loginModal"
                            >
                                Login
                            </span>

                            <span
                                className="text-muted"
                                data-toggle="modal"
                                data-target="#registerModal"
                            >
                                Register
                            </span>
                        </>
                    ) : (
                        <>
                            <Link to="/profile">
                                <img
                                    className="profilepicture"
                                    src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
                                    alt=""
                                />
                            </Link>

                            <span onClick={handleLogout}>
                                Logout
                                <b>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </b>
                            </span>
                        </>
                    )}
                </div>
            </div>
            <Loginmodal />
            <Registermodel />
        </>
    )
}

export default Navbar
