import React, { useEffect } from "react";
import { connect } from 'react-redux'
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { getOrderAction, clearOrderUpdateOutcomeAction, setOrderAction } from "../store/features/order";
import green from '@material-ui/core/colors/green';
import Grid from "@material-ui/core/Grid";
import moment from 'moment'
import ProductCard from './../components/ProductCard'

import useOrderUpdateApi from '../hooks/useOrderUpdateApi'

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center'
    },
    orderStatus: {
        textTransform: 'uppercase'
    },
    orderConfirmed: {
        color: green[500]
    },
}))

const Order: React.FC = ({ user, order, getOrder, setOrder, errors, success }: any) => {
    const classes = useStyles()
    // component state
    const [loading, setLoading] = React.useState<boolean>(false)
    // fetch order details
    React.useEffect(() => {
        setLoading(true)
        getOrder()
        // getCategory({ queryParams })
    }, [])

    // turn loader off after fetching order data
    useEffect(() => {
        return () => {
            setLoading(false)
        }
    }, [order])

    useOrderUpdateApi(user, (orderUpdate: any) => {
        let orderUpdateObj = {
            ...order,
            order_status: orderUpdate.order.order_status,
            delivery_time: orderUpdate.order.delivery_time
        }

        setOrder(orderUpdateObj)
    })

    let productCards
    if (order && order.products) {
        productCards = Object.values(order.products).map((product: any) => {
            return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard title={product.name} image={product.image} price="" manufacturer="" item={product} cartButton={false} infoString={product.custom_message || product.option_selected} />
                </Grid>
            )
        })
    }

    return (
        <Container className={classes.root}>
            <Typography variant="h3" component="h1" color="inherit" noWrap>Order Tracking</Typography>
            <Box mt={2}>
                <Typography variant="h6" color="inherit" noWrap>Details</Typography>
                <Divider />
                {
                    order &&
                    <Box my={4}>
                        <Typography variant="body1" color="inherit" noWrap>Order Status:&nbsp;
                            <Typography variant="h6" component="span" className={clsx(classes.orderStatus, ((order.order_status == 'confirmed' || order.order_status == 'completed') && classes.orderConfirmed))}>{order.order_status}</Typography>
                        </Typography>
                        {
                            order.delivery_time ?
                                <Typography variant="body1" color="inherit" noWrap>Delivery Time:&nbsp;
                                    <Typography variant="h6" component="span" className={clsx(classes.orderStatus, classes.orderConfirmed)}>{moment(order.delivery_time).format('MMMM Do hh:MM a')}</Typography>
                                </Typography>
                                : null
                        }
                        <Box my={4}>
                            <Grid container spacing={3}>
                                {productCards}
                            </Grid>
                        </Box>
                    </Box>
                }
                {/* loader */}
                <Box my={4}>
                    {loading && <CircularProgress />}
                </Box>
                {!loading && !order && <Typography variant="body2" color="inherit" noWrap>No order found.</Typography>}
            </Box>
        </Container >
    )
}

function mapStateToProps(state: any) {
    return {
        order: state.order.order,
        success: state.order.success,
        errors: state.order.error,
        user: state.user.user
    }
}

const mapDispatch = {
    setOrder: setOrderAction,
    getOrder: getOrderAction,
    clearSubmitOutcome: clearOrderUpdateOutcomeAction
}

export default connect(
    mapStateToProps,
    mapDispatch
)(Order)