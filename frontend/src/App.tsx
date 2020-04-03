import React from "react";
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

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
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
            <Route path="/admin/featured/add">
              <AddFeaturedItemForm />
            </Route>
            <Route path="/admin/products/add">
              <AddProductForm />
            </Route>
            <Route path={["/admin/productOption/edit/:id", "/admin/productOption"]}>
              <ProductOptionForm />
            </Route>
            <Route path="/admin/referral/add">
              <GenerateReferralCodesForm />
            </Route>
          </AdminLayout>
        </Route>
        <AppLayout>
          <Route path="/register" children={<RegistrationForm />} />
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

export default App;
