import React from 'react'
import { axiosJWT } from '../../auth/Inter'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const Feesmonthtable = ({ list, filter }) => {
    const user = useSelector((state) => state.user.student)

    const handleSubmit = (e, ls) => {
        e.preventDefault()

        const feeupdate = async () => {
            const parentele = e.target.parentElement
            const parent = parentele.parentElement

            const calc =
                parent.children[3].innerHTML -
                parent.children[6].firstChild.value
            const calc1 =
                parent.children[4].innerHTML -
                parent.children[6].firstChild.value

            const addfees = {
                name: parent.children[1].innerHTML,
                standard: parent.children[2].innerHTML,
                amount:
                    parseInt(ls.feelist.length > 0 ? ls.feelist[0].amount : 0) +
                    parseInt(parent.children[6].firstChild.value),
                dueamount: parent.children[4].innerHTML !== 0 ? calc1 : calc,
                date: parent.children[5].firstChild.value,
            }

            if (e.target.innerHTML === 'Pay') {
                try {
                    const res = await axiosJWT.post(
                        'https://tense-galoshes-colt.cyclic.app/api/fees',
                        addfees
                    )
                    toast.success(res.data)
                    const parentele = e.target.parentElement
                    const parent = parentele.parentElement
                    parent.children[5].firstChild.value = ''
                    parent.children[6].firstChild.value = ''
                } catch (error) {
                    console.log(error)
                    toast.error(error.response.data.message)
                }
            }
            if (e.target.innerHTML === 'Update') {
                const id = ls.feelist.length > 0 && ls.feelist[0]._id

                try {
                    const res = await axiosJWT.put(
                        'https://tense-galoshes-colt.cyclic.app/api/fees/' + id,
                        addfees
                    )
                    toast.success(res.data)
                    const parentele = e.target.parentElement
                    const parent = parentele.parentElement
                    parent.children[5].firstChild.value = ''
                    parent.children[6].firstChild.value = ''
                } catch (error) {
                    console.log(error)
                    toast.error(error.response.data.message)
                }
            }
        }
        feeupdate()
    }

    return (
        <div>
            <form>
                <table className="table table-striped table-responsive">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Standard</th>
                            <th>Total amount</th>
                            <th>Due to pay</th>
                            <th>
                                {filter === 'Month' ||
                                filter === 'Year' ||
                                !user.isAdmin
                                    ? 'Status'
                                    : 'Select date'}
                            </th>
                            <th
                                style={{
                                    display:
                                        filter === 'Month' ||
                                        filter === 'Year' ||
                                        !user.isAdmin
                                            ? 'none'
                                            : '',
                                }}
                            >
                                Amount
                            </th>
                            <th
                                style={{
                                    display:
                                        filter === 'Month' ||
                                        filter === 'Year' ||
                                        !user.isAdmin
                                            ? 'none'
                                            : '',
                                }}
                            ></th>
                            <th
                                style={{
                                    display:
                                        filter === 'Month' ||
                                        filter === 'Year' ||
                                        user.isAdmin
                                            ? ''
                                            : 'none',
                                }}
                            >
                                Paid date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {list.map((ls, index) => (
                            <tr key={ls._id}>
                                <td>{index + 1}</td>
                                <td>{ls.name}</td>
                                <td>{ls.standard}</td>
                                <td>{ls.fees[0].fees}</td>

                                <td>
                                    {ls.feelist.length > 0
                                        ? ls.feelist[0].dueamount
                                        : ls.fees[0].fees}
                                </td>

                                {filter === 'Month' ||
                                filter === 'Year' ||
                                !user.isAdmin ? (
                                    <td
                                        className={
                                            ls.feelist.length > 0
                                                ? ls.feelist[0].dueamount === 0
                                                    ? 'badge badge-success'
                                                    : 'badge badge-warning'
                                                : 'badge badge-danger'
                                        }
                                    >
                                        {ls.feelist.length > 0
                                            ? ls.feelist[0].dueamount === 0
                                                ? 'paid'
                                                : 'Pending'
                                            : 'Not paid'}
                                    </td>
                                ) : (
                                    <td>
                                        <input
                                            type="date"
                                            name="date"
                                            className="inputdate form-control"
                                        />
                                    </td>
                                )}

                                <td
                                    style={{
                                        display:
                                            filter === 'Month' ||
                                            filter === 'Year' ||
                                            !user.isAdmin
                                                ? 'none'
                                                : '',
                                    }}
                                >
                                    <input
                                        type="number"
                                        name="amount"
                                        className="form-control payamount"
                                    />
                                </td>

                                <td
                                    style={{
                                        display:
                                            filter === 'Month' ||
                                            filter === 'Year' ||
                                            !user.isAdmin
                                                ? 'none'
                                                : '',
                                    }}
                                >
                                    <button
                                        onClick={(e) => handleSubmit(e, ls)}
                                        type="submit"
                                        className={
                                            ls.feelist.length > 0
                                                ? ls.feelist[0].dueamount !== 0
                                                    ? 'btn btn-warning feessubmit'
                                                    : ''
                                                : 'btn btn-danger feessubmit'
                                        }
                                    >
                                        {ls.feelist.length > 0
                                            ? ls.feelist[0].dueamount !== 0 &&
                                              'Update'
                                            : 'Pay'}
                                    </button>
                                </td>
                                <td
                                    style={{
                                        display:
                                            filter === 'Month' ||
                                            filter === 'Year'
                                                ? ''
                                                : 'none',
                                    }}
                                >
                                    {filter === 'Month' || filter === 'Year'
                                        ? ls.feelist.length > 0 &&
                                          ls.feelist[0].date
                                        : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Feesmonthtable
