const initState = [];

const covidStatsCountryComparisonReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'ADD_COUNTRY_TO_SELECTION': {
            return [
                ...state,
                {...payload},
            ];
        }
        case 'REMOVE_COUNTRY_FROM_SELECTION': {
            console.log(state)
            const removeCountryIndex = state.findIndex((country) => country.countryInfo.iso3 === payload);
            state.splice(removeCountryIndex, 1)

            return [
                ...state
            ];
        }
        default:
            return state
    }
};

export default covidStatsCountryComparisonReducer;
