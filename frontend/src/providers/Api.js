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
export const getCategory = (id, queryParams) => {
    // public route
    // gets all categories if no id is provided
    let url = '/api/category'
    if (id) {
        url += `/${id}`
    }
    return axios({
        method: 'get',
        params: queryParams,
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
export const getProductOption = (id, queryParams) => {
    // public route
    // gets all categories if no id is provided
    let url = '/api/productOption'
    if (id) {
        url += `/${id}`
    }
    return axios({
        method: 'get',
        params: queryParams,
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

// product

export const submitProductForm = (form) => {
    let method = 'post'

    let url = '/admin/product'

    if (form.id) {
        // add put field to FormData
        formData.set('_method', 'PUT')
        url += `/${form.id}`
    }

    // setup request FormData
    let formData = new FormData();

    for (const [key, val] of Object.entries(form)) {
        if (key === 'category_id' || key === 'product_option_id') {
            for (const id of val) {
                let keyName = [key, '[]'].join('');
                formData.append(keyName, id);
            }
        } else {
            formData.set(key, val)
        }
    }

    return axios({
        method,
        url,
        data: formData
    })
}