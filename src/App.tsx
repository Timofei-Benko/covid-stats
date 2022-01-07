import { CountryFullStats } from './components/CountryFullStats';
// import CountryStatsComparison from './components/CountryStatsComparison';
import { createGlobalStyle } from 'styled-components';
import { CountryInfoModal } from './components/CountryInfoModal';
import React, { Suspense } from 'react';
import { FullScreenLoader } from './components/FullScreenLoader';

const InteractiveMap = React.lazy(() =>
  import('./components/InteractiveMap').then((module) => ({
    default: module.InteractiveMap,
  }))
);

const GlobalStyle = createGlobalStyle`
  html {
    font-family: Poppins, sans-serif;
  }

  .leaflet-container {
    z-index: 1;
    width: 100vw;
    height: 100vh;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<FullScreenLoader />}>
        <>
          <InteractiveMap />
        </>
      </Suspense>
      <CountryInfoModal />
    </>
  );
}

export default App;
