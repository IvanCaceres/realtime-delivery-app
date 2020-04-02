import React from "react"

// material ui components
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

const useStyles = makeStyles(theme => ({
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface formErrors {
    categoryName: string | null,
}

export default function CategoryForm() {
    const classes = useStyles()

    // effects
    let formErrorsState = {
        categoryName: null
    }

    // component state
    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    // form submission loading indicator
    const [loading, setLoading] = React.useState<boolean>(false)
    const [categoryName, setCategoryName] = React.useState<string>('')

    return (
        <Container component="main" maxWidth="sm">
            <form className={classes.form}>
                {/* Category Name */}
                <TextField
                    error={!!formErrors['categoryName']}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="categoryName"
                    label="Category Name"
                    name="categoryName"
                    autoComplete="off"
                    value={categoryName}
                    onChange={(event) => setCategoryName(event?.target.value)}
                />
                {!categoryName && <FormHelperText>Enter a category name.</FormHelperText>}

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