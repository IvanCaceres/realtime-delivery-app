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
    let url = '/category'
    if (id) {
        url += `/${id}`
    }
    return axios({
        method: 'get',
        url
    });
}

export const submitCategoryForm = (name) => {
    return axios({
        method: 'post',
        url: '/admin/category',
        data: {
            name,
        }
    });
}