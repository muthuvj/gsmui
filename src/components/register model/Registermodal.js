import React from 'react'
import './registermodal.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'

const schema = yup.object().shape({
    name: yup.string().required('Name is Required'),
    email: yup
        .string()
        .email()
        .strict()
        .trim()
        .matches(/\w.+@gsm.com/, 'Should be @gsm.com')
        .required('Email is Required'),
    password: yup.string().required('Password is Required').min(6).max(15),
    confirmpassword: yup
        .string()
        .required('Password is Required')
        .oneOf([yup.ref('password'), null], 'Password not match'),
    standard: yup
        .string()
        .required('Must be numeric for primary classes')
        .max(3)
        .strict()
        .trim()
        .uppercase('eg: LKG,UKG or 1'),
    fathername: yup.string().required('This Field is Required'),
    mothername: yup.string().required('This Field is Required'),
    mobilenumber: yup
        .string()
        .strict()
        .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            'Must be only digits'
        )
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')
        .required('Number is Required'),
})

const Registermodel = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
            standard: '',
            fathername: '',
            mothername: '',
            mobilenumber: '',
        },
        validationSchema: schema,
        onSubmit: (data, actions) => {
            const Register = async () => {
                try {
                    const res = await axios.post(
                        'https://tense-galoshes-colt.cyclic.app/api/temp',
                        data
                    )
                    toast.success(res.data)
                } catch (error) {
                    console.log(error.response.data.message)
                    toast.error(error.response.data.message)
                }
            }
            Register()
            actions.resetForm()
        },
    })

    return (
        <div className="modal fade" id="registerModal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title ">REGISTER</h5>
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
                                        Name :
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                </div>
                                <div>
                                    <div></div>
                                    {formik.errors.name ? (
                                        <p className="text-danger ">
                                            {formik.errors.name}
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
                                        Email :
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="off"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                </div>
                                <div>
                                    <div></div>
                                    {formik.errors.email ? (
                                        <p className="text-danger text-center">
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
                                        id="password"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                </div>
                                <div>
                                    <div></div>
                                    {formik.errors.password ? (
                                        <p className="text-danger text-center">
                                            {formik.errors.password}
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
                                        Confirm Password :
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmpassword"
                                        id="confirmpassword"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmpassword}
                                    />
                                </div>
                                <div>
                                    <div></div>
                                    {formik.errors.confirmpassword ? (
                                        <p className="text-danger text-center">
                                            {formik.errors.confirmpassword}
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
                                        Standard :
                                    </label>
                                    <input
                                        type="text"
                                        name="standard"
                                        id="standard"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.standard}
                                    />
                                </div>
                                <div>
                                    <div></div>
                                    {formik.errors.standard ? (
                                        <p className="text-danger text-center">
                                            {formik.errors.standard}
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
                                        Father's Name :
                                    </label>
                                    <input
                                        type="text"
                                        name="fathername"
                                        id="fathername"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.fathername}
                                    />
                                </div>
                                <div>
                                    <div></div>
                                    {formik.errors.fathername ? (
                                        <p className="text-danger text-center">
                                            {formik.errors.fathername}
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
                                        Mother's Name :
                                    </label>
                                    <input
                                        type="text"
                                        name="mothername"
                                        id="mothername"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.mothername}
                                    />
                                </div>
                                <div>
                                    <div></div>
                                    {formik.errors.mothername ? (
                                        <p className="text-danger text-center">
                                            {formik.errors.mothername}
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
                                        Mobile Number :
                                    </label>
                                    <input
                                        type="text"
                                        name="mobilenumber"
                                        id="mobilenumber"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.mobilenumber}
                                    />
                                </div>
                                <div>
                                    <div></div>
                                    {formik.errors.mobilenumber ? (
                                        <p className="text-danger text-center">
                                            {formik.errors.mobilenumber}
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

export default Registermodel
