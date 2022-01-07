import {
  LOAD_COUNTRY_DATA_ERROR,
  LOAD_COUNTRY_DATA_LOADING,
  LOAD_COUNTRY_DATA_SUCCESS,
} from '../actions';

type TCovidStatsByCountryReducer = {
  data: any[] | undefined;
  loading: boolean;
  error: string;
};

const initState: TCovidStatsByCountryReducer = {
  data: [],
  loading: false,
  error: '',
};

const covidStatsByCountryReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_COUNTRY_DATA_LOADING: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case LOAD_COUNTRY_DATA_SUCCESS: {
      return {
        ...state,
        data: [...payload],
        loading: false,
      };
    }
    case LOAD_COUNTRY_DATA_ERROR: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export default covidStatsByCountryReducer;
