import jwtdecode from 'jwt-decode'
import RefreshToken from './RefreshToken.js'
import axios from 'axios'

export const axiosJWT = axios.create()

axiosJWT.interceptors.request.use(
    async (config) => {
        config.headers['token'] = JSON.parse(localStorage.getItem('user'))
            ? 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
            : 'Bearer '

        const usertoken =
            localStorage.getItem('user') &&
            JSON.parse(localStorage.getItem('user'))

        //const usertoken = configureStore.getState().user.student
        // console.log(usertoken)
        let currentdate = new Date()
        const decodetoken = jwtdecode(usertoken.token)

        if (decodetoken.exp * 1000 <= currentdate.getTime()) {
            const data = await RefreshToken()

            config.headers['token'] = 'Bearer ' + data.token
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)
