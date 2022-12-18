import axios from 'axios'
import React from 'react'
import './userapprovertable.css'

const Userapprovertable = ({ data }) => {
    const handleapprove = async (d) => {
        try {
            const { _id, ...rest } = d

            await axios.post(
                'https://tense-galoshes-colt.cyclic.app/api/user/register',
                rest
            )
            await axios.delete(
                'https://tense-galoshes-colt.cyclic.app/api/temp/' + _id
            )
        } catch (error) {
            console.log(error)
        }
    }

    const handleremove = async (d) => {
        try {
            await axios.delete(
                'https://tense-galoshes-colt.cyclic.app/api/temp/' + d._id
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <table className="table table-bordered ">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Standard</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, index) => (
                        <tr key={d._id}>
                            <td>{index + 1}</td>
                            <td>{d.name}</td>
                            <td>{d.standard}</td>
                            <td>
                                <button
                                    type="submit"
                                    className="btn btn-success approvebtn"
                                    onClick={() => handleapprove(d)}
                                >
                                    Approve
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-danger declinebtn"
                                    onClick={() => handleremove(d)}
                                >
                                    Decline
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Userapprovertable
