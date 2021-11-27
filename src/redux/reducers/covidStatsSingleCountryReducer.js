const initState = null;

const covidStatsByCountryReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_COUNTRY_DATA': {
      return {
        ...payload,
      };
    }
    default:
      return state;
  }
};

export default covidStatsByCountryReducer;
