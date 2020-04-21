import React from "react"
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';

// material ui components
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';

import ImageUploader from 'react-images-upload/src/component'

import { clearSubmitFeaturedOutcomeAction, getFeaturedAction, setFeaturedAction, submitFeaturedAction } from './../store/features/featured'
import { getProductAction } from './../store/features/product'
import { getCategoryAction } from './../store/features/category'

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center'
    },
    imgUploader: {
        '& .fileContainer': {
            marginTop: 0,
            marginBottom: 0,
            borderRadius: 4,
            border: `solid 1px ${theme.palette.divider}`,
            boxShadow: 'none'
        },
        '& .uploadPictureContainer': {
            width: '100%'
        },
        '& .uploadPictureContainer:not(:last-of-type)': {
            display: 'none'
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface formErrors {
    featuredTitle: string | null,
    category: string | null,
    product: string | null
}

interface formPayload {
    title: string,
    category_id?: string,
    product_id?: string,
    image?: File | null,
    id?: string,
}

function FeaturedItemForm({ categories, clearSubmitOutcome, errors, featured, getCategory, getFeatured, getProduct, products, setFeatured, submitForm, success }: any) {
    const classes = useStyles()
    let { id } = useParams()
    let history = useHistory()

    let formErrorsState = {
        featuredTitle: null,
        category: null,
        product: null
    }

    // component state
    const [categorySelected, setCategorySelected] = React.useState<string>('')
    const [defaultImage, setDefaultImage] = React.useState<string[] | undefined>(undefined)
    const [featuredId, setFeaturedId] = React.useState<string | undefined>(undefined)
    const [featuredImage, setFeaturedImage] = React.useState<File | null>(null)
    const [featuredImageChanged, setFeaturedImageChanged] = React.useState<boolean>(false)
    const [featuredTitle, setFeaturedTitle] = React.useState<string>('')
    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    const [labelWidth, setLabelWidth] = React.useState(0);
    // form submission loading
    const [loading, setLoading] = React.useState<boolean>(false)
    const [productSelected, setProductSelected] = React.useState<string>('')

    // effects
    // set initial select label width
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    // fetch categories and products
    React.useEffect(() => {
        let queryParams = {
            per_page: 200
        }
        getCategory({ queryParams })
        getProduct({ queryParams })
    }, [])

    // on unmount clear fetched featured data model
    React.useEffect(() => {
        return () => {
            // clear redux store product data
            setFeatured(null)
            clearSubmitOutcome()
        }
    }, [])

    // id effect
    React.useEffect(() => {
        // fetch product if we don't have it
        if (id) {
            setFeaturedId(id)
            if (!featured) {
                getFeatured({ id })
            }
        }
        if (!id) {
            (imageUploaderRef.current as any).clearPictures()
            setFeaturedId(undefined)
            // clear store product data
            setFeatured(null)
            clearSubmitOutcome()
        }
    }, [id])

    // featured data model effect
    React.useEffect(() => {
        if (featured) {
            setFeaturedTitle(featured.title)
            setFeaturedId(featured.id)
            //setup featured image
            if (featured.image) {
                setDefaultImage([`/storage/${featured.image}`])
            }

            // set selected category or product
            if (featured.featurable_type && featured.featurable_id) {
                if (featured.featurable_type === 'App\\Product') {
                    setProductSelected(featured.featurable_id)
                } else if (featured.featurable_type === 'App\\Category') {
                    setCategorySelected(featured.featurable_id)
                }
            }

            if (featured.product) {
            }
        }
        return () => {
            setFeaturedTitle('')
            setFeaturedImage(null)
            setDefaultImage(undefined)
            setCategorySelected('')
            setProductSelected('')
            setFeaturedImageChanged(false)
            setFeaturedId(undefined)
            setFormErrors(formErrorsState)
        }
    }, [featured])

    // clear stale success/error messages when loading a new request
    React.useEffect(() => {
        if (loading) {
            clearSubmitOutcome()
        }
    }, [loading])

    // turn off loading when a form submission response is received
    React.useEffect(() => {
        if (success && success.id) {
            // if we received a created model id navigate to edit with id
            history.push(`/admin/featured/edit/${success.id}`)
        }
        return () => {
            setLoading(false)
        }
    }, [success, errors])

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const imageUploaderRef = React.useRef<ImageUploader>(null);

    function featuredImageChange(files: File[]) {
        setFeaturedImageChanged(true)
        if (files.length > 0) {
            setFeaturedImage(files[0]);
        } else {
            setFeaturedImage(null);
            // remove default image
            setDefaultImage(undefined);
        }
    }

    function imageUploaderButtonStyles() {
        // hide the choose image button if an image is picked or a default image exists (saved conference image was loaded)
        if (featuredImage || defaultImage) {
            return { 'display': 'none' }
        }
        return
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (loading) {
            return
        }
        setLoading(true)
        let form: formPayload = {
            title: featuredTitle,
        }

        if (categorySelected) {
            form.category_id = categorySelected
        } else if (productSelected) {
            form.product_id = productSelected
        }

        if (featuredId) {
            form.id = featuredId
        }

        if (featuredImageChanged) {
            form.image = featuredImage;
        }
        submitForm(form)
    }

    let categoryOptions
    if (categories && categories.data) {
        categoryOptions = categories.data.map((category: any) => {
            return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
        })
    }

    let productSelectOptions
    if (products && products.data) {
        productSelectOptions = products.data.map((product: any) => {
            return <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
        })
    }

    // only one product or category can be linked with a single featured item
    function handleCategoryChange(event: any) {
        setProductSelected('')
        setCategorySelected(event.target.value)
    }

    function handleProductChange(event: any) {
        setCategorySelected('')
        setProductSelected(event.target.value)
    }

    return (
        <Container component="main" maxWidth="sm" className={classes.root}>
            <Typography component="h1" variant="h3">{featuredId ? 'Edit' : 'Create'} Featured Item</Typography>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                {/* Product Name */}
                <TextField
                    error={!!formErrors['featuredTitle']}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="featuredTitle"
                    label="Featured Title"
                    name="featuredTitle"
                    autoComplete="off"
                    value={featuredTitle}
                    onChange={(event) => setFeaturedTitle(event.target.value)}
                />
                <FormHelperText>Add a featured title or content name will be used.</FormHelperText>

                {/* Product Image */}
                <FormControl margin="normal" fullWidth>
                    <ImageUploader
                        ref={imageUploaderRef}
                        className={classes.imgUploader}
                        withIcon={true}
                        singleImage
                        buttonStyles={imageUploaderButtonStyles()}
                        withLabel
                        withPreview
                        buttonText='Set a featured image'
                        onChange={featuredImageChange}
                        imgExtension={['.jpg', '.jpeg', '.png']}
                        maxFileSize={5242880}
                        defaultImages={defaultImage}
                    />
                </FormControl>

                <Box my={2}>
                    <Divider />
                </Box>

                <FormHelperText>You must select either a product or category to feature on the home page.</FormHelperText>

                {/* Categories */}
                <FormControl required error={!!formErrors['category']} variant="outlined" fullWidth margin="normal">
                    <InputLabel ref={inputLabel} id="room-select-label" htmlFor="outlined-age-native-simple">
                        Categories
                    </InputLabel>
                    <Select
                        required
                        value={categorySelected}
                        onChange={handleCategoryChange}
                        labelId="category-select-label"
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'category',
                            id: 'outlined-category-native-simple',
                        }}
                    >
                        {categoryOptions}
                    </Select>
                    <FormHelperText>Select a category to appear in the featured section.</FormHelperText>
                </FormControl>

                {/* Products */}
                <FormControl required error={!!formErrors['product']} variant="outlined" fullWidth margin="normal">
                    <InputLabel id="product-select-label" htmlFor="outlined-product-native-simple">
                        Products
                    </InputLabel>
                    <Select
                        required
                        value={productSelected}
                        onChange={handleProductChange}
                        labelId="product-select-label"
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'product',
                            id: 'outlined-product-native-simple',
                        }}
                    >
                        {productSelectOptions}
                    </Select>
                    <FormHelperText>Or select a product to appear in the featured section.</FormHelperText>
                </FormControl>
                {/* form submit button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Save
                </Button>

                {/* loader */}
                {loading && <CircularProgress />}

                {/* error / success messages */}
                <Box mb={2}>
                    {success ? <Alert variant="outlined" severity="success" children={'Changes saved.'} /> : null}

                    {
                        errors ? errors.map((e: string, index: number) => (
                            <Box mb={2} key={index}><Alert variant="outlined" severity="error" children={e} /></Box>
                        )) : null
                    }
                </Box>
            </form>
        </Container>
    )
}

function mapStateToProps(state: any) {
    return {
        categories: state.category.categories,
        products: state.product.products,
        featured: state.featured.featured,
        success: state.featured.submitSuccess,
        errors: state.featured.submitError
    }
}

const mapDispatch = {
    setFeatured: setFeaturedAction,
    getFeatured: getFeaturedAction,
    submitForm: submitFeaturedAction,
    getProduct: getProductAction,
    getCategory: getCategoryAction,
    clearSubmitOutcome: clearSubmitFeaturedOutcomeAction
}

export default connect(
    mapStateToProps,
    mapDispatch
)(FeaturedItemForm)