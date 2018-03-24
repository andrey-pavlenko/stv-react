import React from 'react';
import Cors from './Cors';
import Url from './Url';
import Auth from './Auth';
import Timezone from './Timezone';
import Format from './Format';
import Interval from './Interval';

export default props => (
  <div>
    <Cors />
    <Url />
    <Auth />
    <Timezone />
    <Format />
    <Interval />
  </div>
);
