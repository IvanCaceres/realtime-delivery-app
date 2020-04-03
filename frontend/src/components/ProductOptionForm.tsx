import React from "react"
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';

// material ui components
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import { submitProductOptionAction, getProductOptionAction, setProductOptionAction, clearSubmitProductOptionOutcomeAction } from "../store/features/productOption";

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center'
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface formErrors {
    optionName: string | null,
}

interface formPayload {
    name: string,
    id?: string
}

function ProductOptionForm({ productOption, success, errors, setProductOption, getProductOption, submitForm, clearSubmitOutcome }: any) {
    const classes = useStyles()
    let { id } = useParams()
    let history = useHistory()

    // effects
    let formErrorsState = {
        optionName: null
    }

    // component state
    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    // form submission loading indicator
    const [loading, setLoading] = React.useState<boolean>(false)
    const [optionId, setOptionId] = React.useState<string | undefined>(undefined)
    const [optionName, setOptionName] = React.useState<string>('')

    // effects
    React.useEffect(() => {
        return () => {
            // clear redux store category data
            setProductOption(null)
            clearSubmitOutcome()
        }
    }, [])

    // id effect
    React.useEffect(() => {
        // fetch category if we don't have it
        if (id && !productOption) {
            setOptionId(id)
            getProductOption(id)
        }
        if (!id) {
            setOptionId(undefined)
            // clear store category data
            setProductOption(null)
            clearSubmitOutcome()
        }
    }, [id])

    // category data model effect
    React.useEffect(() => {
        if (productOption) {
            setOptionName(productOption.name)
        }
        return () => {
            setOptionName('')
        }
    }, [productOption])

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
            history.push(`/admin/productOption/edit/${success.id}`)
        }
        return () => {
            setLoading(false)
        }
    }, [success, errors])



    function handleSubmit(event: any) {
        event.preventDefault()
        if (loading) {
            return
        }
        setLoading(true)
        let formData = {
            name: optionName
        } as formPayload

        if (optionId) {
            formData.id = optionId
        }

        submitForm(formData)
    }

    return (
        <Container component="main" maxWidth="sm" className={classes.root}>
            <Typography component="h1" variant="h3">{optionId ? 'Edit' : 'Create'} Product Option</Typography>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                {/* Option Name */}
                <TextField
                    error={!!formErrors['optionName']}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="optionName"
                    label="Option Name"
                    name="optionName"
                    autoComplete="off"
                    value={optionName}
                    onChange={(event) => setOptionName(event?.target.value)}
                />
                {!optionName && <FormHelperText>Enter an option name.</FormHelperText>}

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
        productOption: state.productOption.productOption,
        success: state.productOption.submitSuccess,
        errors: state.productOption.submitError
    }
}

const mapDispatch = {
    setProductOption: setProductOptionAction,
    submitForm: submitProductOptionAction,
    getProductOption: getProductOptionAction,
    clearSubmitOutcome: clearSubmitProductOptionOutcomeAction
}

export default connect(
    mapStateToProps,
    mapDispatch
)(ProductOptionForm)