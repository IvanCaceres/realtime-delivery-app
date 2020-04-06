import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import HomeContent from "../seed/home";
import { Link } from "react-router-dom";
import FeaturedTiles from './../components/FeaturedTiles'
import { getHomeContentAction } from "../store/features/system";
import ProductCard from './../components/ProductCard'
import GoogleMap from 'google-map-react';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  }
}))

const Cart: React.FC = ({ cart }: any) => {
  const classes = useStyles()
  // component state
  // default location is middle of manhattan before user allows geolocation
  const [userLocation, setUserLocation] = useState<any>(null)

  // cart items
  const [orderItems, setOrderItems] = useState<any[]>([])

  // geolocation watcher id
  const [watcherId, setWatcherId] = useState<number | null>(null)

  // effects
  // get device geolocation on mount
  useEffect(() => {
    // set default location
    setUserLocation({
      lat: 40.754252,
      lng: -73.984786
    })
  }, [])

  useEffect(() => {
    getLocation()
    return () => {
      if (watcherId) {
        navigator.geolocation.clearWatch(watcherId)
      }
    }
  }, [])

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
        selectedOption: '',
        customMessage: ''
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

  let mapApiKey = 'AIzaSyBQ3qO8KfzQWAQ2KXFMTe02qw9BvuKLsqY'

  const Marker = ({ title }: any) => (
    <div style={markerStyle}>
      <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
      <h3>{title}</h3>
    </div>
  );

  function productOptionSelectedUpdated(value: string, productId: string) {
    orderItems.map((orderItem: any) => {
      if (orderItem.id === productId) {
        return {
          ...orderItem,
          selectedOption: value
        }
      }
      return orderItem
    })
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

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos: any) => {
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
            center={userLocation && { lat: userLocation.lat, lng: userLocation.lng }}
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
      </Container>
    </div >
  );
};

function mapStateToProps(state: any) {
  return {
    cart: state.cart.cart,
  }
}

const mapDispatch = {
}

export default connect(
  mapStateToProps,
  mapDispatch
)(Cart)