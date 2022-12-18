import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axiosJWT } from '../../auth/Inter'
import Feesmonthtable from '../../components/feesmonthtable/Feesmonthtable'
import Navbar from '../../components/navbar/Navbar'
import './fees.css'

const Fees = () => {
    const [date, setDate] = useState('')
    const [filter, setFilter] = useState('')
    const [list, setList] = useState([])
    const [monthlist, setMonthlist] = useState([])
    const [yearlist, setYearlist] = useState([])
    const [student, setStudent] = useState([])
    const [stu, setStu] = useState('')
    const user = useSelector((state) => state.user.student)

    const handlemonth = (e) => {
        setDate(e.target.value)
    }

    useEffect(() => {
        const yearfilter = async () => {
            try {
                const res = await axiosJWT.get(
                    `https://tense-galoshes-colt.cyclic.app/api/fees/year?year=${date}`
                )
                const data = res.data.filter((f) => f.name === user.name)

                user.isAdmin && stu === ''
                    ? setYearlist(res.data.filter((f) => !f.isAdmin))
                    : setYearlist(res.data.filter((s) => s.name === stu))
                !user.isAdmin && setYearlist(data)
            } catch (error) {
                console.log(error)
            }
        }
        yearfilter()
    }, [date, filter, stu, user.isAdmin, user.name])

    useEffect(() => {
        const monthfilter = async () => {
            try {
                const res = await axiosJWT.get(
                    `https://tense-galoshes-colt.cyclic.app/api/fees/month?month=${date}`
                )
                const data = res.data.filter((f) => f.name === user.name)

                !user.isAdmin && setMonthlist(data)
                user.isAdmin && setMonthlist(res.data.filter((f) => !f.isAdmin))
            } catch (error) {
                console.log(error)
            }
        }
        monthfilter()
    }, [date, filter, user.isAdmin, user.name])

    useEffect(() => {
        const student = async () => {
            try {
                const res = await axiosJWT.get(
                    'https://tense-galoshes-colt.cyclic.app/api/user/'
                )
                setStudent(res.data.filter((f) => !f.isAdmin))
            } catch (error) {
                console.log(error)
            }
        }
        student()
    }, [])

    useEffect(() => {
        const unpaidlist = async () => {
            try {
                const res = await axiosJWT.post(
                    'https://tense-galoshes-colt.cyclic.app/api/fees/list',
                    { date: date }
                )

                const data = res.data.filter((f) => f.name === user.name)

                !user.isAdmin && setList(data)

                let uplist = res.data.map((l) => {
                    return l.feelist.length === 0
                        ? l
                        : l.feelist.filter((fl) => {
                              return fl.dueamount > 0
                          }).length > 0 && l
                })

                let unplist = uplist.filter((a) => {
                    return a !== false
                })
                user.isAdmin && setList(unplist.filter((f) => !f.isAdmin))
            } catch (error) {
                console.log(error)
            }
        }
        unpaidlist()
    }, [date, filter, user.isAdmin, user.name])

    return (
        <>
            <Navbar />
            <div className="feescontainer">
                <div className="feeswrapper">
                    <div className="feesdate">
                        <input
                            placeholder="Select month..."
                            type="month"
                            name="month"
                            onChange={handlemonth}
                            className="inputmonth form-control"
                        />
                    </div>

                    <div className="feesfilter">
                        <label htmlFor="">Filter By:</label>
                        <ol className="breadcrumb">
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
                    </div>
                    {!user.isAdmin
                        ? ''
                        : filter === 'Year' && (
                              <div className="studentfilter">
                                  <label htmlFor="stu">Select student</label>
                                  <select
                                      id="stu"
                                      name={stu}
                                      onChange={(e) => setStu(e.target.value)}
                                  >
                                      <option value="">--select--</option>
                                      {student.map((st) => (
                                          <option
                                              className="form-control"
                                              value={st.name}
                                              key={st._id}
                                          >
                                              {st.name}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                          )}
                </div>
                {filter === '' && <Feesmonthtable list={list} />}
                {filter === 'Month' && (
                    <Feesmonthtable list={monthlist} filter={filter} />
                )}
                {filter === 'Year' && (
                    <Feesmonthtable list={yearlist} filter={filter} />
                )}
            </div>
        </>
    )
}

export default Fees
