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
    productName: string | null,
    category: string | null
}

export default function AddProductForm() {
    // effects
    // set initial select label width
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const classes = useStyles()

    let formErrorsState = {
        productName: null,
        category: null,
    }

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    // component state
    const [productImage, setProductImage] = React.useState<File | null>(null)
    const [defaultImage, setDefaultImage] = React.useState<string[] | undefined>(undefined)
    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    // form submission loading
    const [loading, setLoading] = React.useState<boolean>(false)
    const [productCategories, setProductCategories] = React.useState<any[]>([])
    const [productName, setProductName] = React.useState<string>('')

    function productImageChange(files: File[]) {
        // setProductImageChanged(true)
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

    const categoryOptions = (rooms: any) => rooms.map((room: any) => {
        return <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
    })

    return (
        <Container component="main" maxWidth="sm">
            <form>
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
                    <FormHelperText>Category must be selected.</FormHelperText>
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