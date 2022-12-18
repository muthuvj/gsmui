import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axiosJWT } from '../../auth/Inter'

const Attendanceyeartable = ({ date }) => {
    const [present, setPresent] = useState([])
    const [absent, setAbsent] = useState([])
    const [value, setValue] = useState([])
    const user = useSelector((state) => state.user.student)

    useEffect(() => {
        const year = async () => {
            try {
                const res = await axiosJWT.get(
                    `https://tense-galoshes-colt.cyclic.app/api/attendance/adminyear?year=${date}`
                )

                const data = res.data.filter((f) => {
                    return f.name === user.name
                })
                !user.isAdmin && setValue(data)

                user.isAdmin && setValue(res.data.filter((f) => !f.isAdmin))

                const presentss = data.map((l) => {
                    return l.filters.filter((n) => {
                        return n.status === 'present'
                    }).length
                })

                !user.isAdmin && setPresent(presentss)

                const presents = res.data.map((l) => {
                    return l.filters.filter((n) => {
                        return n.status === 'present'
                    }).length
                })

                user.isAdmin && setPresent(presents)

                const absentss = data.map((l) => {
                    return l.filters.filter((f) => {
                        return f.status === 'absent'
                    }).length
                })
                !user.isAdmin && setAbsent(absentss)

                const absents = res.data.map((l) => {
                    return l.filters.filter((f) => {
                        return f.status === 'absent'
                    }).length
                })
                user.isAdmin && setAbsent(absents)
            } catch (error) {
                console.log(error)
            }
        }
        year()
    }, [date, user.isAdmin, user.name])

    return (
        <div>
            <table className="table table-responsive-xs table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">No.of.present</th>
                        <th scope="col">No.of.absent</th>
                        <th>Year</th>
                    </tr>
                </thead>

                <tbody>
                    {value.map((val, index) => (
                        <tr key={val._id}>
                            <td>{index + 1}</td>
                            <td>{val.name}</td>
                            <td>{present[index]}</td>
                            <td>{absent[index]}</td>
                            <td>{date.slice(0, 4)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Attendanceyeartable
