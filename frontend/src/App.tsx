import React, { useEffect } from "react";
import { connect } from 'react-redux'

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// layouts
import AdminLayout from './Layouts/AdminLayout'
import AppLayout from './Layouts/AppLayout'

// page components
import AdminDashboard from "./pages/AdminDashboard"
import AddFeaturedItemForm from "./components/FeaturedItemsForm"
import AddProductForm from "./components/AddProductForm"
import CategoryForm from "./components/CategoryForm"
import Category from "./pages/Category";
import GenerateReferralCodesForm from './components/GenerateReferralCodesForm'
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm"
import Product from "./pages/Product";
import ProductOptionForm from "./components/ProductOptionForm";
import RegistrationForm from "./components/RegistrationForm"
import ViewCategories from "./components/ViewCategories";
import ViewProducts from "./components/ViewProducts";
import ViewProductOptions from "./components/ViewProductOptions";
import ViewFeaturedItems from "./components/ViewFeaturedItems";
import ViewReferralCodes from './components/ViewReferralCodes'

import { login } from './store/features/user/userFeatures'

const App: React.FC = ({ login, user }: any) => {
  // attempt user login
  useEffect(() => {
    login()
  }, [])
  let adminRoutes
  if (user && user.admin) {
    adminRoutes = (
      <Route path="/admin">
        <AdminLayout>
          <Route exact path="/admin">
            <AdminDashboard />
          </Route>
          <Route exact path={["/admin/category/edit/:id", "/admin/category"]}>
            <CategoryForm />
          </Route>
          <Route exact path={"/admin/category/view"}>
            <ViewCategories />
          </Route>
          <Route exact path={["/admin/featured/edit/:id", "/admin/featured"]}>
            <AddFeaturedItemForm />
          </Route>
          <Route exact path={"/admin/featured/view"}>
            <ViewFeaturedItems />
          </Route>
          <Route exact path={"/admin/product/view"}>
            <ViewProducts />
          </Route>
          <Route exact path={["/admin/product/edit/:id", "/admin/product"]}>
            <AddProductForm />
          </Route>
          <Route exact path={"/admin/productOption/view"}>
            <ViewProductOptions />
          </Route>
          <Route exact path={["/admin/productOption/edit/:id", "/admin/productOption"]}>
            <ProductOptionForm />
          </Route>
          <Route exact path="/admin/referral/view">
            <ViewReferralCodes />
          </Route>
          <Route exact path="/admin/referral">
            <GenerateReferralCodesForm />
          </Route>
        </AdminLayout>
      </Route>
    )
  }
  console.log('show adminRoutes', adminRoutes)
  return (
    <Router>
      <Switch>
        {adminRoutes}
        <AppLayout>
          < Route path="/register" children={<RegistrationForm />} />
          <Route path="/login" children={<LoginForm />} />
          {/* <Route path="/product/:productId" children={<Product />} /> */}
          {/* <Route path="/:category" children={<Category />} /> */}
          <Route exact path="/">
            <Home />
          </Route>
        </AppLayout>
      </Switch>
    </Router >
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.user.user,
  }
}

const mapDispatch = {
  login,
}

export default connect(
  mapStateToProps,
  mapDispatch
)(App)