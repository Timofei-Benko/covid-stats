import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RippleButton } from '../RippleButton';
import * as Styled from './CountrySelectionModal.styled';
import { TRootState } from '../../redux/store';

function CountrySelectionModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const countrySelectionData = useSelector(
    (store: TRootState) => store.comparison
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (countrySelectionData.length) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [countrySelectionData.length]);

  function removeCountry(ISO3: string) {
    dispatch({
      type: 'REMOVE_COUNTRY_FROM_SELECTION',
      payload: ISO3,
    });
  }

  return (
    <Styled.ModalRoot visible={isModalVisible}>
      <Styled.ModalTitle>
        Selected Countries:
        <Styled.CountryCounter>
          {`${countrySelectionData.length}/4`}
        </Styled.CountryCounter>
      </Styled.ModalTitle>
      {countrySelectionData.length !== 0 && (
        <>
          <Styled.CountrySelectionDataContainer>
            {countrySelectionData.map((country) => (
              <Styled.CountryChip key={`${country.countryInfo.iso3}`}>
                {country.country}
                <Styled.RemoveCountryButton
                  onClick={() => removeCountry(country.countryInfo.iso3)}
                >
                  x
                </Styled.RemoveCountryButton>
              </Styled.CountryChip>
            ))}
          </Styled.CountrySelectionDataContainer>
          <RippleButton
            title={'Compare'}
            disabled={countrySelectionData.length <= 1}
          />
        </>
      )}
    </Styled.ModalRoot>
  );
}

export { CountrySelectionModal };
