import axios from 'axios'

// login
export const login = (username, password) => {
    console.log('login api action', username, password)
    return axios({
        method: 'post',
        url: '/login',
        data: {
            username,
            password
        }
    });
}

export const logout = () => {
    return axios({
        method: 'post',
        url: '/logout'
    });
}

// category
export const getCategory = (id) => {
    // public route
    // gets all categories if no id is provided
    let url = '/api/category'
    if (id) {
        url += `/${id}`
    }
    return axios({
        method: 'get',
        url
    });
}

export const submitCategoryForm = (name, id) => {
    let url = '/admin/category'
    let method = 'post'

    // edit category
    if (id) {
        url += `/${id}`
        method = 'put'
    }

    return axios({
        method,
        url,
        data: {
            name,
        }
    });
}

// product option
export const getProductOption = (id) => {
    // public route
    // gets all categories if no id is provided
    let url = '/api/productOption'
    if (id) {
        url += `/${id}`
    }
    return axios({
        method: 'get',
        url
    });
}


export const submitProductOptionForm = (name, id) => {
    let url = '/admin/productOption'
    let method = 'post'

    // edit productOption
    if (id) {
        url += `/${id}`
        method = 'put'
    }

    return axios({
        method,
        url,
        data: {
            name,
        }
    });
}