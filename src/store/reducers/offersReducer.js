import * as actionTypes from "../actions/actionTypes";

const initialStateOffers = {
  isPending: false,
  offers: [],
  error: null,
};

const reducer = (state = initialStateOffers, action = {}) => {
  switch (action.type) {
    case actionTypes.REQUEST_OFFERS_PENDING:
      return { ...state, isPending: true };
    case actionTypes.REQUEST_OFFERS_SUCCESS:
      return {
        isPending: false,
        error: false,
        offers: action.offers,
      };
    case actionTypes.REQUEST_OFFERS_FAILED:
      return { ...state, isPending: false, error: action.error };

    case actionTypes.LOAD_OFFERS:
      return {
        ...state,
        offers: action.data,
      };
    case actionTypes.DELETE_OFFER:
      return {
        ...state,
        offers: state.offers.filter((offer) => offer.id !== action.id),
      };
    default:
      return state;
  }
};

export default reducer;
