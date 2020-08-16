import React from "react";
import Grid from "@material-ui/core/Grid";
import OfferCard from "./OfferCard";

const OffersList = (props) => {
  const fetchedOffers = props.offers.map((offer) => {
    return (
      <OfferCard
        key={offer.id}
        offer={offer}
        deleteOffer={() => props.deleteOffer(offer.id)}
      />
    );
  });

  return (
    <Grid container justify="center">
      {fetchedOffers}
    </Grid>
  );
};

export default OffersList;
