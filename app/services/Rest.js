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
        let data = new FormData();
        data.append('title', query.title);
        data.append('description', query.description);
        data.append('image', {
            uri: query.image,
            name:'projectImage.jpeg',
            type:'image/jpeg'
        });
        return Axios.post(this.url + '/project', data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data`
            }
        });
    },

    editProject(query) {
        let data = new FormData();

        if (query.title)
            data.append('title', query.title);

        if (query.description)
            data.append('description', query.description);

        data.append('id', query.id);

        if (query.image)
            data.append('image', {
                uri: query.image,
                name:'projectImage.jpeg',
                type:'image/jpeg'
            });

        return Axios.post(this.url + '/editProject', data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data`
            }
        });
    },

    deleteProject(query) {
        return Axios.delete(this.url + '/deleteProject?id=' + query.id);
    }
};

export default Rest;