import React from "react"
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';

// material ui components
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import FormHelperText from '@material-ui/core/FormHelperText'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';

// redux actions
import { login as loginActionCreator } from './../store/features/user/userFeatures'

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
}

function LoginForm({ login }: any) {
    const classes = useStyles()
    const history = useHistory()

    let formErrorsState = {
        username: null,
        password: null,
    }

    // component state
    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    // form submission loading indicator
    const [loading, setLoading] = React.useState<boolean>(false)
    const [password, setPassword] = React.useState<string>('')
    const [username, setUsername] = React.useState<string>('')

    function handleSubmit(event: any) {
        event.preventDefault()
        if (loading) {
            return
        }
        setLoading(true)
        let loginData = {
            username,
            password
        }
        login({ loginData, history })
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box className={classes.pageIconWrap}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
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
                {!username && <FormHelperText>Enter your username.</FormHelperText>}

                {/* Password */}
                <TextField
                    error={!!formErrors['password']}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={(event) => setPassword(event?.target.value)}
                />
                {!password && <FormHelperText>Enter your password.</FormHelperText>}

                {/* form submit button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                // disabled={disableSaveButton()}
                >
                    Login
                </Button>

                {/* loader */}
                {loading && <CircularProgress />}
            </form>
        </Container>
    )
}

const mapDispatch = {
    login: loginActionCreator
}

export default connect(
    undefined,
    mapDispatch
)(LoginForm)