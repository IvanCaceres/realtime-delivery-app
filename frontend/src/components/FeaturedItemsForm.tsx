import React from "react"

// material ui components
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

import ImageUploader from '@ivancaceres/react-images-upload'

const useStyles = makeStyles(theme => ({
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

export default function FeaturedItemsForm() {
    // effects
    // set initial select label width
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const classes = useStyles()

    let formErrorsState = {
        featuredTitle: null,
        category: null,
        product: null
    }

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    // component state
    const [featuredImage, setFeaturedImage] = React.useState<File | null>(null)
    const [defaultImage, setDefaultImage] = React.useState<string[] | undefined>(undefined)
    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    // form submission loading
    const [loading, setLoading] = React.useState<boolean>(false)
    const [categorySelected, setCategorySelected] = React.useState<any[]>([])
    const [productSelected, setProductSelected] = React.useState<any[]>([])
    const [featuredTitle, setFeaturedTitle] = React.useState<string>('')

    // function productImageChange(files: File[]) {
    //     // setProductImageChanged(true)
    //     if (files.length > 0) {
    //         setProductImage(files[0]);
    //     } else {
    //         setProductImage(null);
    //         // remove default image
    //         setDefaultImage(undefined);
    //     }
    // }

    // function productNameChange(event: React.ChangeEvent<{ value: string }>) {
    //     setProductName(event.target.value)
    // }

    function imageUploaderButtonStyles() {
        // hide the choose image button if an image is picked or a default image exists (saved conference image was loaded)
        if (featuredImage || defaultImage) {
            return { 'display': 'none' }
        }
        return
    }

    const categoryOptions = (rooms: any) => rooms.map((room: any) => {
        return <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
    })

    return (
        <Container component="main" maxWidth="sm">
            <form>
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
                        className={classes.imgUploader}
                        withIcon={true}
                        singleImage
                        buttonStyles={imageUploaderButtonStyles()}
                        withLabel
                        withPreview
                        buttonText='Set a featured image'
                        // onChange={productImageChange}
                        imgExtension={['.jpg', '.jpeg', '.png']}
                        maxFileSize={5242880}
                        defaultImages={defaultImage}
                    />
                </FormControl>

                {/* Categories */}
                <FormControl required error={!!formErrors['category']} variant="outlined" fullWidth margin="normal">
                    <InputLabel ref={inputLabel} id="room-select-label" htmlFor="outlined-age-native-simple">
                        Categories
                    </InputLabel>
                    <Select
                        required
                        value={categorySelected}
                        // onChange={handleChange('room_id')}
                        labelId="category-select-label"
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'category',
                            id: 'outlined-category-native-simple',
                        }}
                    >
                        {/* {roomsOptions(rooms)} */}
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
                        // onChange={handleChange('room_id')}
                        labelId="product-select-label"
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'product',
                            id: 'outlined-product-native-simple',
                        }}
                    >
                        {/* {roomsOptions(rooms)} */}
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