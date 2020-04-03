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

// redux
import { submitCategoryFormAction } from './../store/features/category'

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

function CategoryForm({ submitCategoryForm, success, errors }: any) {
    const classes = useStyles()
    let { id } = useParams()
    let history = useHistory()

    let formErrorsState = {
        categoryName: null
    }

    // state
    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    // form submission loading indicator
    const [loading, setLoading] = React.useState<boolean>(false)
    const [categoryId, setCategoryId] = React.useState<string | undefined>(undefined)
    const [categoryName, setCategoryName] = React.useState<string>('')

    // effects
    React.useEffect(() => {
        console.log('only on component mount')
        return () => {
            console.log('component was unmounted')
        }
    }, [])

    React.useEffect(() => {
        console.log('id was updated', id)
        // fetch category if we don't have it
        if (id) {
            setCategoryId(id)
        }
        return () => {
            console.log('id effect clean up')
            setCategoryId(undefined)
        }
    }, [id])

    // clear previous success/error messages when loading a new request
    React.useEffect(() => {
        if (loading) {

        }
    }, [loading])

    // turn off loading when a form submission response is received
    React.useEffect(() => {
        if (success && success.id) {
            // if we received a created model id navigate to edit with id
            history.push(`/admin/category/edit/${success.id}`)
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
            name: categoryName
        }
        submitCategoryForm(formData)
    }

    return (
        <Container component="main" maxWidth="sm">
            <Typography component="h1" variant="h3">{categoryId ? 'Edit' : 'Create'} Category</Typography>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
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
        success: state.category.submitCategoryFormSuccess,
        errors: state.category.submitCategoryFormError
    }
}

const mapDispatch = {
    submitCategoryForm: submitCategoryFormAction
}

export default connect(
    mapStateToProps,
    mapDispatch
)(CategoryForm)