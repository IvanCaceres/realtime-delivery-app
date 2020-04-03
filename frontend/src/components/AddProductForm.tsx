import React from "react"
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';

// material ui components
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography';

import ImageUploader from '@ivancaceres/react-images-upload'

import { submitProductAction, getProductAction, setProductAction, clearSubmitProductOutcomeAction } from "../store/features/product";
import { getProductOptionAction } from './../store/features/productOption'
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
    productName: string | null,
    category: string | null,
    productOption: string | null
}

interface formPayload {
    name: string | null,
    category_id: any[],
    product_option_id: any[]
    image?: File | null;
}

function AddProductForm({ categories, productOptions, getProductOption, getCategory, submitForm }: any) {
    // effects
    // set initial select label width
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    React.useEffect(() => {
        let queryParams = {
            per_page: 200
        }
        getCategory({ queryParams })
        getProductOption({ queryParams })
    }, [])

    const classes = useStyles()

    let formErrorsState = {
        productName: null,
        category: null,
        productOption: null
    }

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    // component state
    const [productImage, setProductImage] = React.useState<File | null>(null)
    const [defaultImage, setDefaultImage] = React.useState<string[] | undefined>(undefined)
    const [productImageChanged, setProductImageChanged] = React.useState<boolean>(false)
    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    // form submission loading
    const [loading, setLoading] = React.useState<boolean>(false)
    const [productCategories, setProductCategories] = React.useState<any[]>([])
    const [selectedProductOptions, setSelectedProductOptions] = React.useState<any[]>([])
    const [productName, setProductName] = React.useState<string>('')

    function productImageChange(files: File[]) {
        setProductImageChanged(true)
        if (files.length > 0) {
            setProductImage(files[0]);
        } else {
            setProductImage(null);
            // remove default image
            setDefaultImage(undefined);
        }
    }

    function productNameChange(event: React.ChangeEvent<{ value: string }>) {
        setProductName(event.target.value)
    }

    function imageUploaderButtonStyles() {
        // hide the choose image button if an image is picked or a default image exists (saved conference image was loaded)
        if (productImage || defaultImage) {
            return { 'display': 'none' }
        }
        return
    }

    function handleSubmit(event: any) {
        event.preventDefault()
        if (loading) {
            return
        }
        setLoading(true)
        let form: formPayload = {
            name: productName,
            category_id: productCategories,
            product_option_id: selectedProductOptions
        }

        if (productImageChanged) {
            form.image = productImage;
        }
        submitForm(form)
    }

    let categoryOptions
    if (categories && categories.data) {
        categoryOptions = categories.data.map((categoryModel: any) => {
            return <MenuItem key={categoryModel.id} value={categoryModel.id}>{categoryModel.name}</MenuItem>
        })
    }

    let productOptionOptions
    if (productOptions && productOptions.data) {
        productOptionOptions = productOptions.data.map((productOptionModel: any) => {
            return <MenuItem key={productOptionModel.id} value={productOptionModel.id}>{productOptionModel.name}</MenuItem>
        })
    }

    return (
        <Container component="main" maxWidth="sm" className={classes.root}>
            <form onSubmit={(e) => handleSubmit(e)}>
                {/* Product Name */}
                <TextField
                    error={!!formErrors['productName']}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="productName"
                    label="Product Name"
                    name="productName"
                    autoComplete="off"
                    value={productName}
                    onChange={productNameChange}
                />
                {!productName && <FormHelperText>A product name is required.</FormHelperText>}

                {/* Product Image */}
                <FormControl margin="normal" fullWidth>
                    <ImageUploader
                        className={classes.imgUploader}
                        withIcon={true}
                        singleImage
                        buttonStyles={imageUploaderButtonStyles()}
                        withLabel
                        withPreview
                        buttonText='Choose Image'
                        onChange={productImageChange}
                        imgExtension={['.jpg', '.jpeg', '.png']}
                        maxFileSize={5242880}
                        defaultImages={defaultImage}
                    />
                </FormControl>

                {/* Product Categories */}
                <FormControl required error={!!formErrors['category']} variant="outlined" fullWidth margin="normal">
                    <InputLabel ref={inputLabel} id="room-select-label" htmlFor="outlined-age-native-simple">
                        Product Category
                    </InputLabel>
                    <Select
                        required
                        multiple
                        value={productCategories}
                        onChange={(e: any) => {
                            setProductCategories(e.target.value)
                        }}
                        labelId="category-select-label"
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'category',
                            id: 'outlined-category-native-simple',
                        }}
                    >
                        {categoryOptions}
                    </Select>
                    <FormHelperText>Category must be selected.</FormHelperText>
                </FormControl>

                {/* Product Options */}
                <FormControl required error={!!formErrors['productOption']} variant="outlined" fullWidth margin="normal">
                    <InputLabel ref={inputLabel} id="productOption-select-label" htmlFor="outlined-productOption-native-simple">
                        Product Options
                    </InputLabel>
                    <Select
                        required
                        multiple
                        value={selectedProductOptions}
                        onChange={(e: any) => {
                            setSelectedProductOptions(e.target.value)
                        }}
                        labelId="productOption-select-label"
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'productOption',
                            id: 'outlined-productOption-native-simple',
                        }}
                    >
                        {productOptionOptions}
                    </Select>
                    <FormHelperText>Select the Product Options available for this product.</FormHelperText>
                </FormControl>

                {/* form submit button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                // disabled={disableSaveButton()}
                >
                    Save
                </Button>

                {/* loader */}
                {loading && <CircularProgress />}
            </form>
        </Container>
    )
}

function mapStateToProps(state: any) {
    return {
        categories: state.category.categories,
        productOptions: state.productOption.productOptions,
        product: state.product.product,
        success: state.productOption.submitSuccess,
        errors: state.productOption.submitError
    }
}

const mapDispatch = {
    setProduct: setProductAction,
    submitForm: submitProductAction,
    getCategory: getCategoryAction,
    getProductOption: getProductOptionAction,
    clearSubmitOutcome: clearSubmitProductOutcomeAction
}

export default connect(
    mapStateToProps,
    mapDispatch
)(AddProductForm)