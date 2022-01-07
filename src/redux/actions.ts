export const LOAD_COUNTRY_DATA_LOADING = 'LOAD_COUNTRY_DATA_LOADING';
export const LOAD_COUNTRY_DATA_SUCCESS = 'LOAD_COUNTRY_DATA_SUCCESS';
export const LOAD_COUNTRY_DATA_ERROR = 'LOAD_COUNTRY_DATA_ERROR';

export function loadCountryDataLoading() {
    return {
        type: LOAD_COUNTRY_DATA_LOADING,
    };
}

export function loadCountryDataSuccess(data) {
    return {
        type: LOAD_COUNTRY_DATA_SUCCESS,
        payload: data,
    };
}

export function loadCountryDataError(error) {
    return {
        type: LOAD_COUNTRY_DATA_ERROR,
        payload: error,
    }
}
