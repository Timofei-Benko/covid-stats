import { css, jsx} from '@emotion/react';

/** @jsxRuntime classic */
/** @jsx jsx */

export default function CountryInfoModal(props) {
    const {
        data,
    } = props;

    const modalStyles = css`
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 99;
      width: 400px;
      margin: 1rem;
      padding: 1rem;
      background-color: #ffffff;
      border-radius: 15px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19),
                  0 6px 6px rgba(0,0,0,0.23);
      
      & h2 {
        margin: 0;
        font-weight: 400;
      }
    `;

    return (
        <div className={'modal'}
             css={modalStyles}
        >
            <h2>Click a country to see its COVID-19 statistics</h2>
        </div>
    )
};
