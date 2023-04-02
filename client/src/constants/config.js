export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        messages: 'Data is being loaded, Please wait'
    },
    success: {
        title: 'Success',
        message: 'Data successfully loaded'
    },
    requestFailure: {
        title: "Error!",
        message: "An error occur while parsing request data"
    },
    responseFailure: {
        title: "Error!",
        message: "An error occur while fetching response from server. Please try again"
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
};

// API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL: { url: "/", method: "POST/GET/PUT/DELETE", params: true/false, query: true/false }

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' },
    uploadFile: { url: 'file/upload', method: 'POST' },
    createPost: { url: 'create', method: 'POST' },
    getAllPosts: { url: '/posts', method: 'GET', query: true },
    getPostById: { url: '/post', method: 'GET', params: true },
    updatePost: { url: '/update', method: 'PUT', params: true },
    deletePost: { url: '/delete', method: 'DELETE', params: true },
    newComment: { url: '/comment/new', method: 'POST' },
    getAllComments: { url: '/comments', method: 'GET', params: true },
    deleteComment: { url: '/comment/delete', method: 'DELETE', params: true },
}