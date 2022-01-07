import axios from 'axios';
import {
  loadCountryDataError,
  loadCountryDataLoading,
  loadCountryDataSuccess,
} from './actions';

const API_BASE_ADDRESS = 'https://corona.lmao.ninja/v2/countries';

export default function loadCountryData() {
  return (dispatch) => {
    dispatch(loadCountryDataLoading());
    axios
      .get(API_BASE_ADDRESS)
      .then((response) => {
        dispatch(loadCountryDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loadCountryDataError(error));
      });
  };
}
