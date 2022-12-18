import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../../auth/Inter'
import { toast } from 'react-toastify'
import './attendancetable.css'

const Attendancetable = ({ date, filter }) => {
    const [value, setValue] = useState([])
    const [student, setStudent] = useState([])

    const handleStatus = (e) => {
        if (
            date.value === '' ||
            date.value === null ||
            date.value === 'undefined'
        ) {
            alert('Select date first')
        } else {
            let status = e.target.value
            let name = e.target.name
            let fnd = value.findIndex((data) => data.name === name)

            fnd >= 0 && value.splice(fnd, 1)
            setValue((prev) => [
                ...prev,
                { name: name, status: status, date: date },
            ])
        }
    }

    useEffect(() => {
        const Show = async () => {
            try {
                const res = await axiosJWT.get(
                    'https://tense-galoshes-colt.cyclic.app/api/user/'
                )

                setStudent(res.data.filter((f) => !f.isAdmin))
            } catch (error) {
                console.log(error.response.data.message)
                toast.error(error.response.data.message)
            }
        }
        Show()
    }, [date, filter])

    useEffect(() => {
        const filterday = async () => {
            setStudent([])
            try {
                const res = await axiosJWT.get(
                    `https://tense-galoshes-colt.cyclic.app/api/attendance/?day=${date}`
                )

                setStudent(res.data)
            } catch (error) {
                setStudent([])
                console.log(error.response.data.message)
                toast.error(error.response.data.message)
            }
        }
        filter && filterday()
    }, [date, filter])

    const handleSubmit = (e) => {
        e.preventDefault()

        let Submit = async () => {
            try {
                const res = await axiosJWT.post(
                    'https://tense-galoshes-colt.cyclic.app/api/attendance/',
                    value
                )
                const radio = document.querySelectorAll('.radio')
                for (let i = 0; i < radio.length; i++) {
                    radio[i].checked = false
                }

                toast.success(res.data)
            } catch (error) {
                const radio = document.querySelectorAll('.radio')
                for (let i = 0; i < radio.length; i++) {
                    radio[i].checked = false
                }
                console.log(error.response.data.message)
                toast.error(error.response.data.message)
            }
        }
        Submit()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table className="table table-responsive-xs table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            student.length > 0
                                ? student.map((student, index) => (
                                      <tr key={student._id}>
                                          <td>{index + 1}</td>
                                          <td>{student.name}</td>
                                          <td>
                                              {filter ? (
                                                  <input
                                                      style={{ border: 'none' }}
                                                      className="text"
                                                      type="text"
                                                      value={student.status}
                                                      disabled
                                                  />
                                              ) : (
                                                  <div className="studentstatus">
                                                      <input
                                                          className="radio"
                                                          type="radio"
                                                          name={student.name}
                                                          value="present"
                                                          onChange={
                                                              handleStatus
                                                          }
                                                          required
                                                          disabled={
                                                              date === '' ||
                                                              date === null ||
                                                              date ===
                                                                  'undefined'
                                                                  ? true
                                                                  : false
                                                          }
                                                      />
                                                      <label htmlFor="present">
                                                          Present
                                                      </label>
                                                      <input
                                                          className="radio"
                                                          type="radio"
                                                          name={student.name}
                                                          value="absent"
                                                          onChange={
                                                              handleStatus
                                                          }
                                                          required
                                                          disabled={
                                                              date === '' ||
                                                              date === null ||
                                                              date ===
                                                                  'undefined'
                                                                  ? true
                                                                  : false
                                                          }
                                                      />
                                                      <label htmlFor="absent">
                                                          Absent
                                                      </label>
                                                  </div>
                                              )}
                                          </td>
                                      </tr>
                                  ))
                                : null //<h1 className="text-danger">No Data's</h1>
                        }
                    </tbody>
                </table>
                {filter ? null : (
                    <button
                        type="submit"
                        className="attendancesubmit btn btn-primary"
                    >
                        Submit
                    </button>
                )}
            </form>
        </div>
    )
}

export default Attendancetable
