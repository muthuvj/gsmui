import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../../auth/Inter'
import Navbar from '../../components/navbar/Navbar'
import Userapprovertable from '../../components/userapprovertable/Userapprovertable'
import './admin.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const Admin = () => {
    const [list, setList] = useState([])
    const [fee, setFee] = useState('')
    const [amount, setAmount] = useState('')
    const [reg, setReg] = useState([])
    const [news, setNews] = useState('')

    const handlepost = async () => {
        try {
            await axiosJWT.delete(
                'https://tense-galoshes-colt.cyclic.app/api/newsfeed/'
            )
            const res = await axiosJWT.post(
                'https://tense-galoshes-colt.cyclic.app/api/newsfeed/',
                { news: news }
            )
            toast.success(res.data)
            setNews('')
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const handledelete = async () => {
        try {
            const res = await axiosJWT.delete(
                'https://tense-galoshes-colt.cyclic.app/api/newsfeed/'
            )
            toast.success(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getreg = async () => {
            try {
                const res = await axios.get(
                    'https://tense-galoshes-colt.cyclic.app/api/temp'
                )
                setReg(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getreg()
    }, [])

    useEffect(() => {
        const fee = async () => {
            try {
                const res = await axiosJWT(
                    'https://tense-galoshes-colt.cyclic.app/api/feeslist/'
                )
                setList(res.data)
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
        }
        fee()
    }, [amount, fee])
    const handleUpdate = () => {
        const update = async () => {
            try {
                const res = await axiosJWT.put(
                    `https://tense-galoshes-colt.cyclic.app/api/feeslist/${fee.id}`,
                    { amount: amount }
                )
                toast.success(res.data)
                setAmount('')
            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error)
            }
        }
        update()
    }

    return (
        <div className="admincontainer">
            <Navbar news={news} />

            <div className="adminwrapper container">
                <div className="topcontainer">
                    <div className="newsfeed mr-5">
                        <textarea
                            className="form-control"
                            name="news"
                            id="news"
                            cols="30"
                            rows="3"
                            value={news}
                            onChange={(e) => setNews(e.target.value)}
                        ></textarea>
                        <button
                            className="btn btn-outline-success"
                            onClick={handlepost}
                        >
                            Post
                        </button>
                        <button
                            className="btn btn-outline-danger ml-2"
                            onClick={handledelete}
                        >
                            Delete
                        </button>
                    </div>
                    <div className="updatefees">
                        <label htmlFor="" className="text-muted">
                            Update Fees :
                            <span className="h3 badge badge-primary ml-2">
                                {fee.fees}
                            </span>
                        </label>
                        <div className="form-group">
                            <div>
                                <label htmlFor="fee" className="mr-2">
                                    Classes
                                </label>

                                <select
                                    id="fee"
                                    onChange={(e) =>
                                        setFee(JSON.parse(e.target.value))
                                    }
                                >
                                    <option value={JSON.stringify({})}>
                                        --Select--
                                    </option>
                                    {list.map((l) => (
                                        <option
                                            key={l._id}
                                            value={JSON.stringify({
                                                id: l._id,
                                                fees: l.fees,
                                            })}
                                        >
                                            {l.class}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className="form-control mt-2"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-warning mt-2"
                                    onClick={handleUpdate}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="userapprover">
                    <label htmlFor="" className="text-secondary">
                        Approve Users:
                    </label>
                    <Userapprovertable data={reg} />
                </div>
            </div>
        </div>
    )
}

export default Admin
