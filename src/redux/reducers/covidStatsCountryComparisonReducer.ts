export type TCountry = {
  continent: string;
  country: string;
  recoveredPerOneMillion: number;
  cases: number;
  critical: number;
  oneCasePerPeople: number;
  active: number;
  testsPerOneMillion: number;
  population: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  recovered: number;
  criticalPerOneMillion: number;
  tests: number;
  deathsPerOneMillion: number;
  todayRecovered: number;
  casesPerOneMillion: number;
  countryInfo: {
    flag: string;
    _id: number;
    iso2: string;
    lat: number;
    long: number;
    iso3: string;
  };
  updated: number;
  activePerOneMillion: number;
  deaths: number;
  todayCases: number;
  todayDeaths: number;
};

const initState: [] | TCountry[] = [];

const covidStatsCountryComparisonReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_COUNTRY_TO_SELECTION': {
      return [...state, { ...payload }];
    }
    case 'REMOVE_COUNTRY_FROM_SELECTION': {
      const removeCountryIndex = state.findIndex(
        (country) => country.countryInfo.iso3 === payload
      );
      state.splice(removeCountryIndex, 1);

      return [...state];
    }
    default:
      return state;
  }
};

export default covidStatsCountryComparisonReducer;
