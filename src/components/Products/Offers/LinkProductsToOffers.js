import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import * as constants from "../Search/SearchConstants";
import Divider from "@material-ui/core/Divider";
import OffersList from "./OffersList";
import Spinner from "../../UI/Spinner";
import Snackbar from "../../UI/Snackbar";

const useStyles = makeStyles((theme) => ({
  searchForm: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  main: {
    margin: 50,
  },
  heading: {
    margin: "30px 0px",
    textAlign: "center",
  },
  searchButton: {
    margin: 10,
    height: 50,
  },
  buttonConfirmContainer: {
    display: "flex",
    justifyContent: "center",
    margin: 20,
  },
  buttonConfirm: {
    fontWeight: 900,
    padding: "10px 40px",
  },
  offersList: {
    marginTop: 20,
  },
  offerNotFound: {
    textAlign: "center",
    margin: "40px 0px",
  },
}));

const LinkProductsToOffers = (props) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    if (props.editSuccess)
      setSnackbar({ open: true, message: props.editSuccess });
    else if (props.editError)
      setSnackbar({ open: true, message: props.editError });
  }, [props.editSuccess, props.editError]);

  const closeSnackbarHandler = () => {
    setSnackbar({ open: false, message: "" });
    if (props.editError) props.resetFailedAlerts();
    else if (props.editSuccess) {
      props.resetSuccessAlerts();
    }
  };

  useEffect(() => {
    if (props.location.state !== undefined) {
      setName(props.location.state.product.name);
      props.loadOffers(props.location.state.product.offers);
    }
    // eslint-disable-next-line
  }, []);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const brandChangeHandler = (event) => {
    setBrand(event.target.value);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    if (title !== "" && brand !== "") {
      const data = [];
      //Title
      if (title !== "")
        data.push({ [constants.CONTAINS]: [constants.TITLE, title] });
      //Brand
      if (brand !== "")
        data.push({
          [constants.EQUALS]: [constants.BRAND, brand],
        });

      props.searchOffers(data, props.token);
    }
  };

  const saveSubmitHandler = () => {
    let product = { ...props.location.state.product };
    const newoffers = props.offers.map((offer) => offer.id);
    product = { ...product, offers: newoffers };

    props.editProduct(product, props.token);
  };

  const deleteOfferHandler = (id) => {
    props.deleteOffer(id);
  };

  let offers = null;
  if (props.isPending) {
    offers = <Spinner />;
  }
  if (props.offers.length !== 0) {
    const offersList = (
      <OffersList offers={props.offers} deleteOffer={deleteOfferHandler} />
    );

    offers = (
      <>
        <div className={classes.offersList}>
          <Divider />
          {offersList}
        </div>
      </>
    );
  }

  const offerNotFound =
    props.offers.length === 0 ? (
      <div className={classes.offerNotFound}>
        <Typography variant="h6" gutterBottom>
          NO OFFER FOUND
        </Typography>
        <Divider />
      </div>
    ) : null;

  return (
    <>
      <Snackbar
        open={snackbar.open}
        close={closeSnackbarHandler}
        message={snackbar.message}
      />
      <div className={classes.main}>
        <div className={classes.heading}>
          <Typography variant="h5">{name}</Typography>
        </div>
        <form className={classes.searchForm} noValidate autoComplete="off">
          <Grid container justify="center" direction="row">
            {/* Title */}
            <Grid item>
              <TextField
                id="title"
                variant="outlined"
                label="Title"
                value={title}
                onChange={titleChangeHandler}
              />
            </Grid>
            {/* Brand */}
            <Grid item>
              <TextField
                id="brand"
                variant="outlined"
                label="Brand"
                value={brand}
                onChange={brandChangeHandler}
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                className={classes.searchButton}
                variant="contained"
                color="secondary"
                onClick={searchSubmitHandler}
              >
                SEARCH OFFERS
              </Button>
            </Grid>
          </Grid>
        </form>
        {offerNotFound}
        {offers}
        <div className={classes.buttonConfirmContainer}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            classes={{ root: classes.buttonConfirm }}
            onClick={saveSubmitHandler}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    offers: state.offers.offers,
    error: state.offers.error,
    isPending: state.offers.isPending,
    editSuccess: state.products.editSuccess,
    editError: state.products.editError,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchOffers: (data, token) => dispatch(actions.searchOffers(data, token)),
    loadOffers: (offers) => dispatch(actions.loadOffers(offers)),
    deleteOffer: (id) => dispatch(actions.deleteOffer(id)),
    editProduct: (product, token) =>
      dispatch(actions.editProducts(product, token)),
    resetSuccessAlerts: () => dispatch(actions.resetProductsSuccessAlerts()),
    resetFailedAlerts: () => dispatch(actions.resetProductsFailedAlerts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkProductsToOffers);
