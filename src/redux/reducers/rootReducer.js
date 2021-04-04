import { combineReducers} from "redux";
import covidStatsByCountryReducer from "./covidStatsByCountryReducer";
import covidStatsSingleCountryReducer from "./covidStatsSingleCountryReducer";
import covidStatsCountryComparisonReducer from "./covidStatsCountryComparisonReducer";

const rootReducer = combineReducers(
    {
                global: covidStatsByCountryReducer,
                singleCountry: covidStatsSingleCountryReducer,
                comparison: covidStatsCountryComparisonReducer,
        }
    );

export default rootReducer;