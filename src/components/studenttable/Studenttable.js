import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../../auth/Inter'
import { toast } from 'react-toastify'

const Studenttable = () => {
    const [student, setStudent] = useState([])

    useEffect(() => {
        const studentlist = async () => {
            try {
                const res = await axiosJWT.get(
                    'https://tense-galoshes-colt.cyclic.app/api/user/'
                )
                setStudent(res.data.filter((f) => !f.isAdmin))
            } catch (error) {
                console.log(error)
            }
        }
        studentlist()
    }, [])

    const handleremove = async (s) => {
        try {
            const res = await axiosJWT.delete(
                'https://tense-galoshes-colt.cyclic.app/api/user/' + s._id
            )
            toast.success(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <table className="table table-striped table-responsive">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Standard</th>
                        <th>Father's Name</th>
                        <th>Mother's Name</th>
                        <th>Mobile</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((s, index) => (
                        <tr key={s._id}>
                            <td>{index + 1}</td>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.standard}</td>
                            <td>{s.fathername}</td>
                            <td>{s.mothername}</td>
                            <td>{s.mobile}</td>
                            <td>
                                <button
                                    type="submit"
                                    className="btn btn-danger declinebtn"
                                    onClick={() => handleremove(s)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Studenttable
