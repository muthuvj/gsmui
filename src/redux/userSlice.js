import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { axiosJWT } from '../auth/Inter'

export const user = createAsyncThunk(
    'user/login',
    async (stu, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                'https://tense-galoshes-colt.cyclic.app/api/user/login',
                stu
            )

            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

const userslice = createSlice({
    name: 'user',
    initialState: {
        student: JSON.parse(localStorage.getItem('user'))
            ? JSON.parse(localStorage.getItem('user'))
            : null,
        pending: false,
        error: false,
    },
    reducers: {
        Log_out: (state) => {
            axiosJWT.post(
                'https://tense-galoshes-colt.cyclic.app/api/user/logout',
                {
                    refreshtoken: JSON.parse(localStorage.getItem('user'))
                        ?.refreshtoken,
                }
            )

            localStorage.removeItem('user')
            state.student = null
        },
    },
    extraReducers: {
        [user.pending]: (state) => {
            state.pending = true
            state.error = false
        },
        [user.fulfilled]: (state, action) => {
            state.pending = false
            state.error = false
            state.student = action.payload
            localStorage.setItem('user', JSON.stringify(state.student))
        },
        [user.rejected]: (state, action) => {
            state.pending = false
            state.error = true
            toast.error(action.payload)
        },
    },
})

export const { Log_out } = userslice.actions
export default userslice.reducer
