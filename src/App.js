import React from 'react';
import { styled, ThemeProvider } from 'styled-components';

import Wrapper from './containers/Wrapper';
import NavBar from './components/NavBar';
import GlobalStats from './containers/GlobalStats';
import USAStats from './containers/USAStats';
import NavHeader from './components/NavHeader';
import StateStats from './containers/StateStats';

const theme = {
  font: 'Sans-Serif'
};


export default () => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <NavBar>
        <NavHeader>Live COVID-19 Tracker</NavHeader>
      </NavBar>
      <GlobalStats></GlobalStats>
      <USAStats></USAStats>
      <StateStats></StateStats>
    </Wrapper>
  </ThemeProvider>
);

