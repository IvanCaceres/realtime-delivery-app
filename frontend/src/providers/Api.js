import axios from 'axios'

// login
export const login = (username, password) => {
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

export const submitRegisterForm = (form) => {
    let url = '/register'
    let method = 'post'

    return axios({
        method,
        url,
        data: {
            ...form
        }
    });
}

// home content
export const getHomeContent = () => {
    // public route
    // gets all home content (featured tiles and products)
    let url = '/api/home'
    return axios({
        method: 'get',
        url
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

export const deleteCategory = (id) => {
    let method = 'delete'
    let url = `/admin/category/${id}`
    return axios({
        method,
        url
    })
}

// product option
export const getProductOption = (id, queryParams) => {
    // public route
    // gets all product options if no id is provided
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

// featured
export const getFeatured = (id, queryParams) => {
    // public route
    // gets all featured items if no id is provided
    let url = '/api/featuredItem'
    if (id) {
        url += `/${id}`
    }
    return axios({
        method: 'get',
        params: queryParams,
        url
    });
}

export const submitFeaturedForm = (form) => {
    let method = 'post'
    let url = '/admin/featuredItem'

    // setup request FormData
    let formData = new FormData();
    if (form.id) {
        // add put field to FormData, allows laravel to spoof and detect PUT request
        formData.set('_method', 'PUT')
        url += `/${form.id}`
    }

    for (const [key, val] of Object.entries(form)) {
        formData.set(key, val)
    }

    return axios({
        method,
        url,
        data: formData
    })
}

export const deleteFeatured = (id) => {
    let method = 'delete'
    let url = `/admin/featuredItem/${id}`
    return axios({
        method,
        url
    })
}

// product
export const getProduct = (id, queryParams) => {
    // public route
    // gets all products if no id is provided
    let url = '/api/product'
    if (id) {
        url += `/${id}`
    }
    return axios({
        method: 'get',
        params: queryParams,
        url
    });
}

export const submitProductForm = (form) => {
    let method = 'post'
    let url = '/admin/product'

    // setup request FormData
    let formData = new FormData();
    if (form.id) {
        // add put field to FormData
        formData.set('_method', 'PUT')
        url += `/${form.id}`
    }



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

// referral code
export const getReferralCode = (queryParams) => {
    // private admine route
    // gets all referral codes
    let url = '/admin/referralCode'

    return axios({
        method: 'get',
        params: queryParams,
        url
    });
}


export const submitReferralCodeForm = (quantity) => {
    let url = '/admin/referralCode'
    let method = 'post'

    return axios({
        method,
        url,
        data: {
            quantity,
        }
    });
}

// order
export const getAdminOrders = (id) => {
    let url = '/admin/orders'

    if (id) {
        url += `/${id}`
    }

    return axios({
        method: 'get',
        url
    });
}


export const getOrder = () => {
    let url = '/order'
    return axios({
        method: 'get',
        url
    });
}

export const submitAdminOrderEdit = (form) => {
    let method = 'put'
    let url = '/admin/orders'

    url += `/${form.id}`

    return axios({
        method,
        url,
        data: form
    })
}

export const submitOrder = (form) => {
    let method = 'post'
    let url = '/order'

    return axios({
        method,
        url,
        data: form
    })
}