import Axios from "axios";
import objectToFormData from 'object-to-formdata';

let cancel;
cancel && cancel();

const options = {
    indices: true,
    nullsAsUndefineds: false,
};

const Rest = {
    // url: `http://192.168.29.63:3100`,
    url: `http://dolfox.tk/dofy`,

    CancelToken: Axios.CancelToken,

    cancel() {
        cancel();
    },

    getAllProjects() {
        return Axios.get(this.url + '/getProject');
    },

    createProject(query) {
        return Axios.post(this.url + '/createProject', query, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
};

export default Rest;