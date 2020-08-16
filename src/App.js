import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import AppBar from "./components/Navigation/Appbar";
import Products from "./components/Products/Products";
import Logout from "./components/Auth/Logout";
import Auth from "./components/Auth/Auth";
import LinkProductsToOffers from "./components/Products/Offers/LinkProductsToOffers";

const App = (props) => {
  const { onReloadCheckAuthStatus } = props;
  useEffect(() => {
    onReloadCheckAuthStatus();
  }, [onReloadCheckAuthStatus]);

  let routes = (
    <>
      <Route path="/auth" exact component={Auth} />
      <Redirect to="/auth" />
    </>
  );
  if (props.isAuthenticated) {
    routes = (
      <>
        <Route path="/" exact component={Products} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/linkproducts" component={LinkProductsToOffers} />
      </>
    );
  }

  return (
    <>
      <AppBar />
      {routes}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReloadCheckAuthStatus: () => dispatch(actions.authCheckStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
