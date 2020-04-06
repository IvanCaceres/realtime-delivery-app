import React from "react"
import { connect } from 'react-redux'

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
import MuiPhoneNumber from 'material-ui-phone-number'

import ImageUploader from '@ivancaceres/react-images-upload'
import { submitRegisterFormAction, clearRegisterSubmitOutcomeAction } from "../store/features/system";

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: `${theme.spacing(1)}px auto`,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    pageIconWrap: {
        textAlign: 'center'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface formErrors {
    username: string | null,
    password: string | null,
    confirmPassword: string | null,
    referralCode: string | null,
    phoneNumber: string | null,
}

interface formPayload {
    username: string,
    password: string,
    password_confirmation: string,
    referral_code: string,
    phone: string
}

function RegistrationForm({ submitForm, success, errors, clearSubmitOutcome }: any) {
    const classes = useStyles()
    let formErrorsState = {
        username: null,
        password: null,
        confirmPassword: null,
        referralCode: null,
        phoneNumber: null
    }
    // component state
    const [confirmPassword, setConfirmPassword] = React.useState<string>('')
    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    // form submission loading indicator
    const [loading, setLoading] = React.useState<boolean>(false)
    const [password, setPassword] = React.useState<string>('')
    const [phoneNumber, setPhoneNumber] = React.useState<string>('')
    const [referralCode, setReferralCode] = React.useState<string>('')
    const [username, setUsername] = React.useState<string>('')

    // effects

    // on component unmount clear submission outcome store data
    React.useEffect(() => {
        return () => {
            // clear redux store registerSubmitOutcome data
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
        // if registration successful clear current form
        if (success) {
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            setPhoneNumber('')
            setReferralCode('')
            setFormErrors(formErrorsState)
        }
        return () => {
            setLoading(false)
        }
    }, [success, errors])

    function phoneNumberChange(value: string) {
        setPhoneNumber(value)
    }

    function handleSubmit(event: any) {
        event.preventDefault()
        if (loading) {
            return
        }
        setLoading(true)

        let formData = {
            username,
            password,
            password_confirmation: confirmPassword,
            phone: phoneNumber,
            referral_code: referralCode,
        } as formPayload

        submitForm(formData)
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box className={classes.pageIconWrap}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
            </Box>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                {/* Username */}
                <TextField
                    error={!!formErrors['username']}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="off"
                    value={username}
                    onChange={(event) => setUsername(event?.target.value)}
                />
                {!username && <FormHelperText>A username is required.</FormHelperText>}

                {/* Password */}
                <TextField
                    error={!!formErrors['password']}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={(event) => setPassword(event?.target.value)}
                />
                {!password && <FormHelperText>A password is required.</FormHelperText>}

                {/* Confirm Password */}
                <TextField
                    error={!!formErrors['confirmPassword']}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    autoComplete="off"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event?.target.value)}
                />
                {!confirmPassword && <FormHelperText>You must confirm the password entered.</FormHelperText>}

                {/* Phone Number */}
                <MuiPhoneNumber
                    defaultCountry={'us'}
                    disableDropdown
                    variant="outlined"
                    required
                    margin="normal"
                    error={!!formErrors['phoneNumber']}
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={phoneNumberChange}
                    countryCodeEditable={false}
                />
                {phoneNumber.length < 16 && <FormHelperText>You must provide a valid phone number.</FormHelperText>}

                {/* Referral Code */}
                <TextField
                    error={!!formErrors['referralCode']}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="referralCode"
                    label="Referral Code"
                    name="referralCode"
                    autoComplete="off"
                    value={referralCode}
                    onChange={(event) => setReferralCode(event?.target.value)}
                />
                {!referralCode && <FormHelperText>A valid referral code is required.</FormHelperText>}

                {/* form submit button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Register
                </Button>

                {/* loader */}
                {loading && <CircularProgress />}

                {/* error / success messages */}
                <Box mb={2}>
                    {success ? <Alert variant="outlined" severity="success" children={'User account successfully registered.'} /> : null}

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
        success: state.system.registerSubmitSuccess,
        errors: state.system.registerSubmitError
    }
}

const mapDispatch = {
    submitForm: submitRegisterFormAction,
    clearSubmitOutcome: clearRegisterSubmitOutcomeAction
}

export default connect(
    mapStateToProps,
    mapDispatch
)(RegistrationForm)