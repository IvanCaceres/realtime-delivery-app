import React, { useEffect } from "react";
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import HomeContent from "../seed/home";
import { Link } from "react-router-dom";
import FeaturedTiles from './../components/FeaturedTiles'
import { getHomeContentAction } from "../store/features/system";
import ProductCard from './../components/ProductCard'

const Home: React.FC = ({ featured, products, getHomeContent }: any) => {
  // effects
  // on mount get home content from api
  useEffect(() => {
    getHomeContent()
  }, [])

  let productCards
  if (products) {
    productCards = products.map((product: any) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProductCard title={product.name} image={product.image} price="" manufacturer="" />
        </Grid>
      )
    })
  }

  return (
    <div>
      <FeaturedTiles featured={featured} />
      <Box mt={3}>
        <Grid container spacing={3}>
          {productCards}
        </Grid>
      </Box>
    </div>);
};

function mapStateToProps(state: any) {
  return {
    featured: state.system.featured,
    products: state.system.products,
  }
}

const mapDispatch = {
  getHomeContent: getHomeContentAction,
}

export default connect(
  mapStateToProps,
  mapDispatch
)(Home)