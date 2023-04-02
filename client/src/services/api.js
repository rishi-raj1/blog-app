import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    function (config) {
        // console.log('request interceptor me hai api.js me');
        // console.log(config.url);

        if (config.TYPE.params) {
            // console.log('request bhejne se phle request object ko change kr rhe hai if me api.js me ');
            // console.log(config);
            // console.log(config.TYPE);
            // console.log(config.TYPE.params);
            // console.log(config.TYPE.query);

            config.url = config.url + '/' + config.TYPE.params;
        }
        else if (config.TYPE.query) {
            // console.log('request bhejne se phle request object ko change kr rhe hai else if me api.js me ');
            // console.log(config);
            // console.log(config.url);
            // console.log(config.TYPE);
            // console.log(config.TYPE.query);
            // console.log(config.TYPE.params);

            config.params = config.TYPE.query;

            // console.log(config)
            // console.log(config.url);
        }

        // console.log(config.url);
        // console.log(config);

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        // stop global loader here . project me jha me loader use kiye hai usko yha se rok skte hai

        // console.log(response.data);
        // console.log(response);

        return processResponse(response);
    },
    function (error) {
        // stop global loader here

        // return Promise.reject(processError(error));
        // uppar wale code se uncaught in promise error aa rha tha console me because uppar wala code 
        // promise return nhi kr rha hai and createPost.jsx me ya kisi bhi file me hmlog promise expect 
        // kr rhe the response me  isiliye niche wala code apne man se likhe hai

        return processError(error);
    }
);

// If success -> return { isSuccess : true, data: Object}
// If fail -> return { isFailure : true, status: String, msg: String, code: int}

const processResponse = (response) => {
    // console.log(response);

    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    }
    else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code,
        }
    }
};


// If success -> return { isSuccess : true, data: Object}
// If fail -> return { isFailure : true, status: String, msg: String, code: int}

const processError = (error) => {

    // console.log(error);

    if (error.response) {
        // Request made and server responded with a status other 
        // that fails out of the range 2.x.x

        console.log('ERROR IN RESPONSE ', error.toJSON());

        console.log(error.response);

        if (error.response.status === 409) {
            // this error will come in signup process when username already exists.

            return {
                isError: true,
                msg: error.response.data.msg,
                code: error.response.status
            }
        }
        if (error.response.status === 400) {
            // this error will come in login process when username or password is wrong.

            return {
                isError: true,
                msg: 'username or password is incorrect',
                code: error.response.status
            }
        }

        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }
    else if (error.request) {
        // Request made but no response was received

        console.log('ERROR IN REQUEST ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else {
        // Something happened in setting up request that triggers an error

        console.log('ERROR IN NETWORK ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
};

const API = {};

// console.log(API);


for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),

            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            },
        })

};

// console.log(API);

export { API };