import { useSelector } from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import './profile.css'

const Profile = () => {
    const user = useSelector((state) => state.user.student)

    return (
        <div className="profilecontainer">
            <Navbar />
            <div className="profiledetails container">
                <div className="form-group">
                    <label htmlFor="" className="text-secondary">
                        Name
                    </label>
                    <span>{user.name}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-secondary">
                        E-mail
                    </label>
                    <span>{user.email}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-secondary">
                        Standard
                    </label>
                    <span>{user.standard}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-secondary">
                        Father's Name
                    </label>
                    <span>{user.fathername}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-secondary">
                        Mother's Name
                    </label>
                    <span>{user.mothername}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-secondary">
                        Mobile
                    </label>
                    <span>{user.mobilenumber}</span>
                </div>
            </div>
        </div>
    )
}

export default Profile
