import React from 'react';
import Cors from './Cors';
import Url from './Url';
import Auth from './Auth';
import Timezone from './Timezone';

export default props => (
  <div>
    <Cors />
    <Url />
    <Auth />
    <Timezone />
  </div>
);
