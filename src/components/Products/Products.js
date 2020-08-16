import React, { useEffect, useState, useCallback } from "react";
import ProductsList from "./ProductsList";
import * as actions from "../../store/actions/index";
import Spinner from "../UI/Spinner";
import Dialog from "../UI/Dialog";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Snackbar from "../UI/Snackbar";

import Pagination from "../UI/Pagination";

const styles = makeStyles(() => ({
  main: {
    marginTop: 20,
  },
  pagination: {
    marginLeft: -40,
    textAlign: "center",
  },
  spinner: {
    height: "75vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    display: "flex",
    justifyContent: "center",
    letterSpacing: ".1rem",
    textTransform: "uppercase",
  },
}));

const Products = (props) => {
  const classes = styles();

  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const { requestProducts, token } = props;
  const [open, setOpen] = useState(false);
  const [dialogPayload, setDialogPayload] = useState();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    requestProducts(currentPage, token);
  }, [currentPage, requestProducts, token]);

  const paginate = useCallback((data) => {
    setCurrentPage(data.selected + 1);
  }, []);

  useEffect(() => {
    if (props.deleteSuccess)
      setSnackbar({ open: true, message: props.deleteSuccess });
    else if (props.deleteError)
      setSnackbar({ open: true, message: props.deleteError });
  }, [props.deleteSuccess, props.deleteError]);

  const closeSnackbarHandler = () => {
    setSnackbar({ open: false, message: "" });
    if (props.deleteError) props.resetFailedAlerts();
    else if (props.deleteSuccess) {
      props.resetSuccessAlerts();
    }
  };

  const closeDialogHandler = () => {
    setOpen(false);
  };

  const dialogConfirmedActionHandler = () => {
    props.deleteProducts(dialogPayload.payload.id, props.token);
    closeDialogHandler();
  };

  const deleteProductHandler = (id) => {
    setDialogPayload({ payload: { id: id } });
    setOpen(true);
  };
  let products = null;
  if (props.error)
    products = <h2 className={classes.errorMessage}>{props.error}</h2>;
  if (props.isPending)
    products = (
      <div className={classes.spinner}>
        <Spinner />;
      </div>
    );
  if (!props.error && !props.isPending)
    products = (
      <h2 className={classes.errorMessage}>Didn't Find Any Product</h2>
    );

  if (
    props.products.results !== undefined &&
    props.products.results.length !== 0 &&
    !props.isPending
  ) {
    products = (
      <>
        <ProductsList
          products={props.products}
          isAuthenticated={props.isAuthenticated}
          deleteProduct={deleteProductHandler}
        />
      </>
    );
  }

  return (
    <>
      <Snackbar
        open={snackbar.open}
        close={closeSnackbarHandler}
        message={snackbar.message}
      />
      <Dialog
        open={open}
        close={closeDialogHandler}
        confirm={dialogConfirmedActionHandler}
      />
      <div className={classes.main}>
        <Grid container justify="center">
          {products}
        </Grid>
        <div className={classes.pagination}>
          <Pagination
            totalItems={props.products.count}
            itemsPerPage={12}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    isAuthenticated: state.auth.token !== null,
    error: state.products.error,
    isPending: state.products.isPending,
    token: state.auth.token,
    deleteError: state.products.deleteError,
    deleteSuccess: state.products.deleteSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestProducts: (page, token) =>
      dispatch(actions.requestProducts(page, token)),
    deleteProducts: (id, token) => dispatch(actions.deleteProducts(id, token)),
    resetSuccessAlerts: () => dispatch(actions.resetProductsSuccessAlerts()),
    resetFailedAlerts: () => dispatch(actions.resetProductsFailedAlerts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
