import axios from 'axios';
import { toast } from 'react-toastify';

// axios.interceptors.response.use(null, error => {
//     // const ExpectedError = error.response && error.response.status >= 400 && error.response.status <= 500;
//     // if (!ExpectedError) {
//     //      toast('Unexpected Error')
//     // }
// });
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem('token')
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const ExpectedError = error.response && error.response.status >= 400 && error.response.status <= 500;
    if (!ExpectedError) {
        toast('Unexpected Error')
    }

    return Promise.reject(error)

});
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}