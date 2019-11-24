import Axios from 'axios'

const axios = Axios.create({
    baseURL:'http://localhost:3012'
})

export default axios