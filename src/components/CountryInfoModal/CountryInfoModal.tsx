import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../redux/store';
import * as Styled from './CountryInfoModal.styled';
import { RippleButton } from '../RippleButton';

export const CountryInfoModal = () => {
  const countryData = useSelector((store: TRootState) => store.singleCountry);
  const countryComparisonData = useSelector(
    (store: TRootState) => store.comparison
  );

  const dispatch = useDispatch();

  function addToSelectionHandler() {
    let isCountryAlreadyInState = false;

    if (countryComparisonData.length > 0) {
      countryComparisonData.forEach((country) => {
        if (countryData.countryInfo.iso3 === country.countryInfo.iso3) {
          isCountryAlreadyInState = true;
        }
      });
    }

    if (isCountryAlreadyInState || countryComparisonData.length === 4) {
      return;
    }

    dispatch({
      type: 'ADD_COUNTRY_TO_SELECTION',
      payload: countryData,
    });
  }

  return (
    <Styled.CountryInfoRoot className={'modal'}>
      {countryData ? (
        <>
          <Styled.CountryInfoContainer>
            <Styled.CountryName>{countryData.country}</Styled.CountryName>
            <Styled.CountryFlag
              src={countryData.countryInfo.flag}
              alt={`the flag of ${countryData.country}`}
            />
          </Styled.CountryInfoContainer>
          <p>Total cases: {countryData.cases}</p>
          <p>Total deaths: {countryData.deaths}</p>
          <p>Total recovered: {countryData.recovered}</p>
          <Styled.ButtonContainer>
            <RippleButton title="See more" />
            <RippleButton
              title="Add to selection"
              onClick={addToSelectionHandler}
            />
          </Styled.ButtonContainer>
        </>
      ) : (
        <h2>Click a country to see its COVID-19 statistics!</h2>
      )}
    </Styled.CountryInfoRoot>
  );
}
