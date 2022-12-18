import React from 'react'
import './loginmodal.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { user } from '../../redux/userSlice.js'

const schema = yup.object().shape({
    email: yup.string().email().required('Email is Required'),
    password: yup.string().required('Password is Required'),
})

const Loginmodal = () => {
    const dispatch = useDispatch()

    // const navigate = useNavigate()
    // const { state } = useLocation()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: async (data, actions) => {
            dispatch(user({ email: data.email, password: data.password }))
            actions.resetForm()

            //   navigate(state?.path)
        },
    })

    return (
        <div className="modal fade" id="loginModal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title ">LOGIN</h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form autoComplete="off" onSubmit={formik.handleSubmit}>
                            <div className="form-inline">
                                <div>
                                    <label
                                        htmlFor=""
                                        className="form-label text-muted"
                                    >
                                        Email :
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <div></div>
                                    {formik.errors.email ? (
                                        <p className="text-danger">
                                            {formik.errors.email}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-inline">
                                <div>
                                    <label
                                        htmlFor=""
                                        className="form-label text-muted"
                                    >
                                        Password :
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <div></div>
                                    {formik.errors.password ? (
                                        <p className="text-danger">
                                            {formik.errors.password}
                                        </p>
                                    ) : null}
                                </div>
                            </div>

                            <div className="form-group">
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginmodal
