import { Component } from 'react';
import PropTypes from 'prop-types';

class Field extends Component {
  static contextTypes = {
    data: PropTypes.object,
    setData: PropTypes.func
  };
}

export default Field;
