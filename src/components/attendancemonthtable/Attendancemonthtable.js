import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../../auth/Inter'
import './attendancemonthtable.css'
import { useSelector } from 'react-redux'

const Attendancemonthtable = ({ date }) => {
    const [value, setValue] = useState([])
    const [present, setPresent] = useState([])
    const [absent, setAbsent] = useState([])
    const user = useSelector((state) => state.user.student)

    useEffect(() => {
        const filtermonth = async () => {
            try {
                const student = await axiosJWT.get(
                    'https://tense-galoshes-colt.cyclic.app/api/user/'
                )

                user.isAdmin && setValue(student.data.filter((f) => !f.isAdmin))

                const res = await axiosJWT.get(
                    `https://tense-galoshes-colt.cyclic.app/api/attendance/adminmonth?month=${date}`
                )

                const data = res.data.filter((f) => {
                    return f.name === user.name
                })
                !user.isAdmin && setValue(data[0].filters)

                let presents = res.data.map(
                    (a) =>
                        a.filters.filter((a) => {
                            return a.status === 'present'
                        }).length
                )

                setPresent(presents)

                let absents = res.data.map(
                    (a) =>
                        a.filters.filter((a) => {
                            return a.status === 'absent'
                        }).length
                )
                setAbsent(absents)
            } catch (error) {
                console.log(error)
            }
        }
        filtermonth()
    }, [date, user.isAdmin, user.name])

    return (
        <div>
            <table className="table table-responsive-sm table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">
                            {!user.isAdmin ? 'Status' : 'No.of.present'}
                        </th>
                        <th
                            scope="col"
                            style={{
                                display: !user.isAdmin ? 'none' : '',
                            }}
                        >
                            No.of.absent
                        </th>
                        <th>Month</th>
                    </tr>
                </thead>

                <tbody>
                    {value
                        ? value.map((val, index) => (
                              <tr key={val._id}>
                                  <td>{index + 1}</td>
                                  <td>{val.name}</td>
                                  <td>
                                      {!user.isAdmin
                                          ? val.status
                                          : present[index]}
                                  </td>
                                  <td
                                      style={{
                                          display: !user.isAdmin ? 'none' : '',
                                      }}
                                  >
                                      {absent[index]}
                                  </td>
                                  <td>
                                      {!user.isAdmin
                                          ? val.date
                                          : date.slice(0, 7)}
                                  </td>
                              </tr>
                          ))
                        : null}
                </tbody>
            </table>
        </div>
    )
}

export default Attendancemonthtable
