import Admin from './pages/admin/Admin'
import Attendance from './pages/attendance/Attendance'
import Fees from './pages/fees/Fees'
import Home from './pages/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './pages/profile/Profile'
import Student from './pages/student/Student'
import Materials from './pages/material/Materials'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import ProtectedRoute from './auth/ProtectedRoute'
import Onlineclass from './pages/onlineclass/Onlineclass'

function App() {
    const users = useSelector((state) => state.user.student)
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route element={<ProtectedRoute users={users} />}>
                        <Route
                            path="/materials"
                            element={<Materials />}
                        ></Route>
                        <Route
                            path="/attendance"
                            element={<Attendance />}
                        ></Route>
                        <Route path="/fees" element={<Fees />}></Route>
                        <Route
                            path="/onlineclass"
                            element={<Onlineclass />}
                        ></Route>
                        <Route
                            path="/onlineclass/:id"
                            element={<Onlineclass />}
                        ></Route>
                        <Route path="/admin" element={<Admin />}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/student" element={<Student />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer theme="colored" />
        </div>
    )
}

export default App
