import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import HomeContent from "../seed/home"
import { Link } from "react-router-dom"
import FeaturedTiles from './../components/FeaturedTiles'
import { getHomeContentAction } from "../store/features/system"
import ProductCard from './../components/ProductCard'
import GoogleMap from 'google-map-react'
import { submitOrderAction, clearSubmitOrderOutcomeAction } from "../store/features/cart";
import { clearOrderAction, getOrderAction } from "../store/features/order";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  }
}))

type productOrderData = {
  id: number,
} & (
    | { product_option_id: number; custom_message?: never }
    | { product_option_id?: never; custom_message: string }
  )

interface userGeoLocation {
  lat: number,
  lng: number
}

interface orderPayload {
  products: productOrderData[],
  location: userGeoLocation
}

const Cart: React.FC = ({ cart, order, clearOrder, getOrder, submitOrder, errors, success, clearSubmitOutcome }: any) => {
  const classes = useStyles()
  // component state
  // default location is middle of manhattan before user allows geolocation
  const [userLocation, setUserLocation] = useState<any>(null)

  // cart items
  const [orderItems, setOrderItems] = useState<any[]>([])

  // geolocation watcher id
  const [watcherId, setWatcherId] = useState<number | null>(null)

  // local form errors
  const [formValidationErrors, setFormValidationErrors] = useState<string[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  let defaultLocation = {
    lat: 40.754252,
    lng: -73.984786
  }

  const history = useHistory()

  // effects
  // fetch order details
  React.useEffect(() => {
    if (order === null) {
      setLoading(true)
      getOrder()
    }
    return () => {
      setLoading(false)
    }
  }, [order])

  // clear order details on unmount
  useEffect(() => {
    return () => {
      clearOrder()
    }
  }, [])

  // redirect to order tracking if user has order
  useEffect(() => {
    if (order) {
      history.push('/trackOrder')
    }
  }, [order])

  // get device geolocation on mount
  useEffect(() => {
    let didCancel = false
    getLocation(didCancel)
    return () => {
      // if component unmounts cancel geoLocation callback setState update
      didCancel = true
    }
  }, [])

  // when component unmounts clear order submission outcomes
  useEffect(() => {
    return () => {
      clearSubmitOutcome()
    }
  }, [])

  // clear stale success/error messages when loading a new request
  useEffect(() => {
    if (loading) {
      clearSubmitOutcome()
    }
  }, [loading])

  // turn off loading when an order submission response is received
  useEffect(() => {
    if (success) {
      // if order successfully placed navigate to order tracking page
      history.push(`/trackOrder`)
    }
    return () => {
      setLoading(false)
    }
  }, [success, errors])

  // setup order items with options / selected option
  useEffect(() => {
    let items: any[] = []
    cart.map((cartProduct: any) => {
      let newOptions = [
        ...cartProduct.options,
        {
          id: 'Custom',
          name: 'Custom'
        }
      ]
      items.push({
        ...cartProduct,
        options: newOptions,
        selected_option: '',
        custom_message: ''
      })
    })
    setOrderItems(items)
  }, [cart])

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

  // google maps api key
  let mapApiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`

  const Marker = ({ title }: any) => (
    <div style={markerStyle}>
      <img style={imgStyle} src="/marker.png" alt={title} />
      <h3>{title}</h3>
    </div>
  );

  function productOptionSelectedUpdated(value: number | string, productId: number, custom: boolean = false) {
    setOrderItems(orderItems.map((orderItem: any) => {
      if (orderItem.id === productId) {
        let optionUpdate: any = {}
        if (custom) {
          optionUpdate.custom_message = value
          optionUpdate.selected_option = ''
        } else {
          optionUpdate.selected_option = value
          optionUpdate.custom_message = ''
        }
        return {
          ...orderItem,
          ...optionUpdate
        }
      }
      return orderItem
    }))
  }

  let orderItemsRender
  if (orderItems) {
    orderItemsRender = orderItems.map((orderItem: any, index: number, products: any[]) => {
      return (
        <div key={orderItem.id}>
          <Box my={2}>
            <ProductCard title={orderItem.name} image={orderItem.image} price="" manufacturer="" item={orderItem} options={orderItem.options} onOptionSelected={productOptionSelectedUpdated} />
          </Box >
          {index < products.length - 1 ? <Divider /> : null}
        </div>
      )
    })
  }

  const getLocation = (didCancel: boolean) => () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos: any) => {
        if (didCancel) {
          return
        }
        let crd = pos.coords
        setUserLocation({
          lat: crd.latitude,
          lng: crd.longitude
        })
      })
    } else {
      alert("Sorry, geolocation is not available on your device. You need that to use this app");
    }
  }

  function validate() {
    let validationErrors = []
    if (orderItems.length < 1) {
      validationErrors.push('No products selected.')
    }
    // ensure every product has a selected option
    for (const orderItem of orderItems) {
      if (!orderItem.selected_option && !orderItem.custom_message) {
        validationErrors.push('Must select an order option for every product in cart.')
        break;
      }
    }
    setFormValidationErrors(validationErrors)

    if (validationErrors.length > 0) {
      return validationErrors
    }
    return false
  }

  function handleOrderSubmit() {
    if (validate()) {
      return
    }
    if (loading) {
      return
    }
    setLoading(true)

    let productsPayload: productOrderData[] = orderItems.map((orderItem: any) => {
      console.log('show orderItem', orderItem)
      let option_data: any = {}

      if (orderItem.selected_option) {
        option_data.product_option_id = orderItem.selected_option
      } else {
        option_data.custom_message = orderItem.custom_message
      }

      return {
        id: orderItem.id,
        ...option_data
      } as productOrderData
    })

    let payload: orderPayload = {
      products: productsPayload,
      location: {
        lat: userLocation.lat,
        lng: userLocation.lng
      }
    }

    submitOrder(payload)
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="inherit" noWrap>
        Confirm Order
      </Typography>
      <Container component="main" maxWidth="sm">
        <Box mt={4}>

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
          <Box mt={2}>
            <Typography variant="body1" color="inherit" noWrap>
              Confirm Your Location. Allow device location tracking.
            </Typography>
          </Box>
        </Box>

        <Box my={4}>
          <Divider />
        </Box>

        <Box>
          <Typography variant="h4" color="inherit" noWrap>
            Products in cart:
          </Typography>
          {orderItems.length > 0 ? orderItemsRender : <Typography variant="body1" color="inherit" noWrap>No items in cart.</Typography>}
        </Box>

        {/* loader */}
        {loading && <CircularProgress />}

        {/* error / success messages */}
        <Box my={2}>
          {/* {success ? <Alert variant="outlined" severity="success" children={'Changes saved.'} /> : null} */}
          {
            formValidationErrors.map((formValidationError: string) => {
              return (
                <Box mb={2} key={formValidationError}><Alert variant="outlined" severity="error" children={formValidationError} /></Box>
              )
            })
          }
          {
            errors ? errors.map((e: string, index: number) => (
              <Box mb={2} key={index}><Alert variant="outlined" severity="error" children={e} /></Box>
            )) : null
          }
        </Box>

        <Box my={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOrderSubmit}
          >
            Submit Order
          </Button>
        </Box>

      </Container>
    </div >
  );
};

function mapStateToProps(state: any) {
  return {
    order: state.order.order,
    cart: state.cart.cart,
    errors: state.cart.submitError,
    success: state.cart.submitSuccess
  }
}

const mapDispatch = {
  submitOrder: submitOrderAction,
  clearSubmitOutcome: clearSubmitOrderOutcomeAction,
  getOrder: getOrderAction,
  clearOrder: clearOrderAction
}

export default connect(
  mapStateToProps,
  mapDispatch
)(Cart)