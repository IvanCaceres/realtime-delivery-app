import React, { useEffect } from "react";
import { connect } from 'react-redux'

import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

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
import Cart from "./pages/Cart";
import Order from './pages/Order'
import EditOrder from './components/EditOrderForm'
import LoginForm from "./components/LoginForm"
import Product from "./pages/Product";
import ProductOptionForm from "./components/ProductOptionForm";
import RegistrationForm from "./components/RegistrationForm"
import ViewCategories from "./components/ViewCategories";
import ViewProducts from "./components/ViewProducts";
import ViewProductOptions from "./components/ViewProductOptions";
import ViewFeaturedItems from "./components/ViewFeaturedItems";
import ViewReferralCodes from './components/ViewReferralCodes'

import useEcho from './hooks/useEcho'
import { EchoContext } from './context/echo'

import { login } from './store/features/user/userFeatures'
import ViewOrders from "./components/ViewOrders";

const App: React.FC = ({ login, user }: any) => {
  const echo = useEcho()
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
          <Route exact path="/admin/order/edit/:id">
            <EditOrder />
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

  return (
    <EchoContext.Provider value={echo}>
      <Router>
        <Switch>
          {adminRoutes}
          <AppLayout>
            < Route path="/register" children={<RegistrationForm />} />
            <Route path="/login" children={<LoginForm />} />
            {/* <Route path="/product/:productId" children={<Product />} /> */}
            {/* <Route path="/:category" children={<Category />} /> */}.
            <Route exact path="/trackOrder">
              <Switch>
                {user ? <Order /> : <Redirect to="/login" />}
              </Switch>
            </Route>
            <Route exact path="/cart">
              <Switch>
                {user ? <Cart /> : <Redirect to="/login" />}
              </Switch>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </AppLayout>
        </Switch>
      </Router >
    </EchoContext.Provider>
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