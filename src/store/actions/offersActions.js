import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axiosInstance";

const requestOffersPending = () => {
  return { type: actionTypes.REQUEST_OFFERS_PENDING };
};

const requestOffersSuccess = (offers) => {
  return {
    type: actionTypes.REQUEST_OFFERS_SUCCESS,
    offers: offers,
  };
};

const requestOffersFailed = (error) => {
  return {
    type: actionTypes.REQUEST_OFFERS_FAILED,
    error: error,
  };
};

export const deleteOffer = (id) => {
  return {
    type: actionTypes.DELETE_OFFER,
    id: id,
  };
};

export const loadOffers = (data) => {
  return {
    type: actionTypes.LOAD_OFFERS,
    data: data,
  };
};

export const searchOffers = (data, token) => {
  return (dispatch) => {
    dispatch(requestOffersPending());
    axiosInstance
      .post("/api/offers/search/", data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        dispatch(requestOffersSuccess(response.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(requestOffersFailed(error.response.statusText));
        } else if (error.request) {
          dispatch(requestOffersFailed("Failed to fetch OFFERs"));
        }
      });
  };
};
