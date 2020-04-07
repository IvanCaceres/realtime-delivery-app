import React, { useState, useEffect, useRef } from "react"
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';

// material ui components
import Alert from '@material-ui/lab/Alert';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import Event from "@material-ui/icons/Event";
import { IconButton, InputAdornment } from "@material-ui/core";
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import MomentUtils from '@date-io/moment';
import { TimePicker } from "@material-ui/pickers";
import GoogleMap from 'google-map-react'
import moment from 'moment'

import { submitAdminOrderEditFormAction, clearSubmitAdminOrderEditOutcomeAction, getAdminOrdersAction } from "../store/features/order";

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
    status: string | null,
}

interface formPayload {
    id: string,
    delivery_time: any,
    order_status: string,
}

let defaultLocation = {
    lat: 40.754252,
    lng: -73.984786
}

const mapStyles = {
    width: '100%',
    height: '300px',
    position: 'relative'
}

const imgStyle = {
    height: '100%'
}

const markerStyle = {
    height: '50px',
    width: '50px',
    marginTop: '-50px'
}

function EditOrderForm({ order, success, errors, getOrder, submitForm, clearSubmitOutcome }: any) {
    const classes = useStyles()
    let { id } = useParams()
    let history = useHistory()

    let formErrorsState = {
        status: null
    }

    // google maps api key
    let mapApiKey = 'AIzaSyBQ3qO8KfzQWAQ2KXFMTe02qw9BvuKLsqY'

    const Marker = ({ title }: any) => (
        <div style={markerStyle}>
            <img style={imgStyle} src="/marker.png" alt={title} />
            <h3>{title}</h3>
        </div>
    );

    // component state
    const [formErrors, setFormErrors] = useState<formErrors>(formErrorsState)
    // form submission loading indicator
    const [loading, setLoading] = useState<boolean>(false)
    const [orderId, setOrderId] = useState<string | undefined>(undefined)
    const [labelWidth, setLabelWidth] = useState(0);
    const [statusSelected, setStatusSelected] = useState<string>('')
    const [deliveryDate, setDeliveryDate] = useState<any>(null)
    // default location is middle of manhattan before user allows geolocation
    const [userLocation, setUserLocation] = useState<any>(null)

    const inputLabel = useRef<HTMLLabelElement>(null);

    // effects
    // set initial select label width
    useEffect(() => {
        if (order) {
            if (order.delivery_time) {
                setDeliveryDate(moment(order.delivery_time))
            }

            if (order.location) {
                setUserLocation({
                    lat: order.location.lat,
                    lng: order.location.lng
                })
            }

            setStatusSelected(order.order_status)
            if (inputLabel.current) {
                setLabelWidth(inputLabel.current!.offsetWidth);
            }
        }
    }, [order]);

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


    // effects
    // React.useEffect(() => {
    //     return () => {
    //         // clear redux store product option data
    //         setProductOption(null)
    //         clearSubmitOutcome()
    //     }
    // }, [])

    // id effect
    React.useEffect(() => {
        // fetch order if we don't have it
        if (id) {
            setOrderId(id)
            if (!order) {
                getOrder({ id })
            }
        }
        // if (!id) {
        //     setOptionId(undefined)
        //     // clear store product option data
        //     setProductOption(null)
        //     clearSubmitOutcome()
        // }
    }, [id])

    // // product option data model effect
    // React.useEffect(() => {
    //     if (productOption) {
    //         setOptionName(productOption.name)
    //     }
    //     return () => {
    //         setOptionName('')
    //     }
    // }, [productOption])







    function handleSubmit(event: any) {
        event.preventDefault()
        if (loading) {
            return
        }
        setLoading(true)

        let formData = {
            id,
            delivery_time: deliveryDate.toISOString(),
            order_status: statusSelected
        } as formPayload

        submitForm(formData)
    }

    let statusOptions = [
        <MenuItem key={'confirmed'} value={'confirmed'}>Confirmed</MenuItem>,
        <MenuItem key={'pending'} value={'pending'}>Pending</MenuItem>,
        <MenuItem key={'canceled'} value={'canceled'}>Canceled</MenuItem>,
        <MenuItem key={'completed'} value={'completed'}>Completed</MenuItem>,
    ]

    return (
        <Container component="main" maxWidth="sm" className={classes.root}>
            <Typography component="h1" variant="h3">Edit Order</Typography>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                {
                    order &&
                    <>
                        <Box mt={4}>
                            <Typography variant="body1">
                                Order Placed:&nbsp;
                                <b>{moment(order.placed).format('MM-DD-YY hh:mm a')}</b>
                            </Typography>
                            <Typography variant="body1">
                                User:&nbsp;
                        <b>{order.user.username}</b>
                            </Typography>
                            <Typography variant="body1">
                                Phone:&nbsp;
                        <b>{order.user.phone}</b>
                            </Typography>
                        </Box>
                        {/* order products */}
                        <Box mt={4}>
                            <Typography variant="h6">Order Products</Typography>
                            <Divider />
                            <List component="nav" className={classes.root} aria-label="mailbox folders">
                                {Object.values(order.products).map((product: any, index: number, products: any[]) => {
                                    return (
                                        <div key={product.id}>
                                            <ListItem button>
                                                <ListItemText primary={product.name} />
                                                <div>{product.option_selected || product.custom_message}</div>
                                            </ListItem>
                                            {index < products.length - 1 && <Divider />}
                                        </div>
                                    )
                                })}
                            </List>
                        </Box>
                        {/* order status */}
                        <FormControl required error={!!formErrors['status']} variant="outlined" fullWidth margin="normal">
                            <InputLabel ref={inputLabel} id="status-select-label" htmlFor="outlined-status-native-simple">
                                Order Status
                        </InputLabel>
                            <Select
                                required
                                value={statusSelected}
                                onChange={(e: any) => setStatusSelected(e.target.value)}
                                labelId="status-select-label"
                                labelWidth={labelWidth}
                                inputProps={{
                                    name: 'status',
                                    id: 'outlined-status-native-simple',
                                }}
                            >
                                {statusOptions}
                            </Select>
                            <FormHelperText>Select an order status.</FormHelperText>
                        </FormControl>

                        {/* delivery time */}
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <TimePicker autoOk label="Delivery Time" value={deliveryDate} required margin="normal" onChange={setDeliveryDate} inputVariant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <Event />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <Box my={4}>
                            <GoogleMap
                                style={mapStyles}
                                bootstrapURLKeys={{ key: mapApiKey }}
                                center={userLocation ? { lat: userLocation.lat, lng: userLocation.lng } : defaultLocation}
                                zoom={14}
                            >
                                {
                                    userLocation &&
                                    <Marker
                                        title={'Current Location'}
                                        lat={userLocation.lat}
                                        lng={userLocation.lng}
                                    />
                                }
                            </GoogleMap>
                        </Box>
                    </>
                }
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
        order: state.order.adminOrder,
        success: state.order.adminSubmitSuccess,
        errors: state.order.adminSubmitError
    }
}

const mapDispatch = {
    submitForm: submitAdminOrderEditFormAction,
    getOrder: getAdminOrdersAction,
    clearSubmitOutcome: clearSubmitAdminOrderEditOutcomeAction
}

export default connect(
    mapStateToProps,
    mapDispatch
)(EditOrderForm)