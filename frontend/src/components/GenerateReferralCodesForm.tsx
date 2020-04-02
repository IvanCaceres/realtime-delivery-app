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
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
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
    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    // form submission loading
    const [loading, setLoading] = React.useState<boolean>(false)
    const [quantity, setQuantity] = React.useState<any[]>([])


    const quantityOptions = (
        <>
            <MenuItem key={10} value={10}>10</MenuItem>
            <MenuItem key={25} value={25}>25</MenuItem>
            <MenuItem key={50} value={50}>50</MenuItem>
        </>
    )

    return (
        <Container component="main" maxWidth="sm">
            <form>
                {/* Referral Code Quantity */}
                <FormControl required error={!!formErrors['category']} variant="outlined" fullWidth margin="normal">
                    <InputLabel ref={inputLabel} id="quantity-select-label" htmlFor="quantity-age-native-simple">
                        Quantity
                    </InputLabel>
                    <Select
                        required
                        multiple
                        value={quantity}
                        // onChange={handleChange('room_id')}
                        labelId="quantity-select-label"
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'quantity',
                            id: 'outlined-quantity-native-simple',
                        }}
                    >
                        {quantityOptions}
                    </Select>
                    <FormHelperText>Choose the quantity of referral codes to be generated.</FormHelperText>
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
                    Generate Codes
                </Button>

                {/* loader */}
                {loading && <CircularProgress />}
            </form>
        </Container>
    )
}