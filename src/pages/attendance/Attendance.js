import React, { useState } from 'react'
import Attendancemonthtable from '../../components/attendancemonthtable/Attendancemonthtable'
import Attendancetable from '../../components/attendancetable/Attendancetable'
import Attendanceyeartable from '../../components/attendanceyeartable/Attendanceyeartable'
import Navbar from '../../components/navbar/Navbar'
import './attendance.css'
import { useSelector } from 'react-redux'

const Attendance = () => {
    const [filter, setFilter] = useState('')
    const [date, setDate] = useState('')
    const user = useSelector((state) => state.user.student)

    return (
        <div>
            <Navbar />
            <div className="attendancewarrper">
                {/* <div className="cardattendance">
                    <Cards />
                    <Cards />
                </div> */}
                <div className="attendancefilter">
                    <div className="attendancedate">
                        <input
                            type="date"
                            name="date"
                            onChange={(e) => setDate(e.target.value)}
                            required
                            placeholder="Select date..."
                            className="form-control dateinput mb-2"
                        />
                    </div>

                    <div className="filter">
                        <label>Filter By:</label>
                        <nav>
                            <ol className="breadcrumb">
                                <li
                                    style={{ display: !user.isAdmin && 'none' }}
                                    className="breadcrumb-item"
                                    onClick={(e) =>
                                        filter === e.target.innerHTML
                                            ? setFilter('')
                                            : setFilter(e.target.innerHTML)
                                    }
                                >
                                    Day
                                </li>
                                <li
                                    className="breadcrumb-item"
                                    onClick={(e) =>
                                        filter === e.target.innerHTML
                                            ? setFilter('')
                                            : setFilter(e.target.innerHTML)
                                    }
                                >
                                    Month
                                </li>
                                <li
                                    className="breadcrumb-item"
                                    onClick={(e) =>
                                        filter === e.target.innerHTML
                                            ? setFilter('')
                                            : setFilter(e.target.innerHTML)
                                    }
                                >
                                    Year
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {(user.isAdmin && filter === '' && (
                    <Attendancetable date={date} />
                )) ||
                    (filter === 'Day' && (
                        <Attendancetable filter={filter} date={date} />
                    ))}
                {(!user.isAdmin && filter === '' && (
                    <Attendancemonthtable date={date} />
                )) ||
                    (filter === 'Month' && (
                        <Attendancemonthtable date={date} />
                    ))}
                {filter === 'Year' && <Attendanceyeartable date={date} />}
            </div>
        </div>
    )
}

export default Attendance
