import React from 'react';
import Format from './Format';
import Encoding from './Encoding';
import Interval from './Interval';
import Variants from './Variants';
import Channels from './Channels';

// TODO: 2 columns Variants and Channels

export default props => (
  <div>
    <Format />
    <Encoding />
    <Interval />
    <Variants />
    <Channels />
  </div>
);
