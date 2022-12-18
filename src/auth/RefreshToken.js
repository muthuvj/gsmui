import axios from 'axios'

const RefreshToken = async () => {
    try {
        const usertoken = JSON.parse(localStorage.getItem('user'))

        const res = await axios.post(
            'https://tense-galoshes-colt.cyclic.app/api/refreshtoken/',
            {
                token: usertoken.refreshtoken,
            }
        )

        localStorage.setItem(
            'user',
            JSON.stringify({
                ...usertoken,
                token: res.data.token,
                refreshtoken: res.data.refreshtoken,
            })
        )

        return res.data
    } catch (error) {
        console.log(error.response.data.message)
    }
}

export default RefreshToken
