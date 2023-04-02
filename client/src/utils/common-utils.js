

export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
}

export const addElipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str
}

export const getType = (value, body) => {
    if (value.params) {
        // console.log('common utils.js me hai, aur params true bheje hain ');

        if (typeof body === 'object') {
            // when we update post then control comes here
            return { params: body._id };
        }
        else {
            return { params: body };
        }
    }
    else if (value.query) {
        // console.log('value.query me hain and typeof body ye rha and body bhi ', typeof body, body);
        return { query: body }
    }

    return {}
}