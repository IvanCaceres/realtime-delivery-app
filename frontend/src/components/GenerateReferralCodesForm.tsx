import React from "react"
import { connect } from 'react-redux'

// material ui components
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography';
import { clearSubmitReferralCodeFormOutcomeAction, submitReferralCodeFormAction } from "../store/features/referralCode"

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface formErrors {
    quantity: string | null
}

interface formPayload {
    quantity: number
}

function ReferralCodeForm({ submitForm, success, errors, clearSubmitOutcome }: any) {
    const classes = useStyles()
    let formErrorsState = {
        quantity: null,
    }
    // component state
    const [labelWidth, setLabelWidth] = React.useState(0);

    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    // form submission loading
    const [loading, setLoading] = React.useState<boolean>(false)
    const [quantity, setQuantity] = React.useState<string>('')

    // effects
    // set initial select label width
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    // on component unmount clear redux store referral submission data
    React.useEffect(() => {
        return () => {
            clearSubmitOutcome()
        }
    }, [])

    // clear stale success/error messages when loading a new request
    React.useEffect(() => {
        if (loading) {
            clearSubmitOutcome()
        }
    }, [loading])

    // turn off loading when a form submission response is received
    React.useEffect(() => {
        return () => {
            setLoading(false)
        }
    }, [success, errors])




    const inputLabel = React.useRef<HTMLLabelElement>(null);

    const quantityOptions = (
        [
            <MenuItem key={'10'} value={'10'}>10</MenuItem>,
            <MenuItem key={'25'} value={'25'}>25</MenuItem>,
            <MenuItem key={'50'} value={'50'}>50</MenuItem>
        ]
    )

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (loading) {
            return
        }
        setLoading(true)
        let form: formPayload = {
            quantity: parseInt(quantity),
        }
        submitForm(form)
    }


    return (
        <Container component="main" maxWidth="sm" className={classes.root}>
            <Typography component="h1" variant="h3">Generate Referral Codes</Typography>
            <form onSubmit={handleSubmit}>
                {/* Referral Code Quantity */}
                <FormControl required error={!!formErrors['quantity']} variant="outlined" fullWidth margin="normal">
                    <InputLabel ref={inputLabel} id="quantity-select-label" htmlFor="quantity-age-native-simple">
                        Quantity
                    </InputLabel>
                    <Select
                        required
                        value={quantity}
                        onChange={(e: any) => setQuantity(e.target.value)}
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
                >
                    Generate Codes
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
        success: state.referralCode.submitSuccess,
        errors: state.referralCode.submitError
    }
}

const mapDispatch = {
    submitForm: submitReferralCodeFormAction,
    clearSubmitOutcome: clearSubmitReferralCodeFormOutcomeAction
}

export default connect(
    mapStateToProps,
    mapDispatch
)(ReferralCodeForm)