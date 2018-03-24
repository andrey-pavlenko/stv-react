import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Field from './Field';

class ValidationField extends Field {
  static contextTypes = {
    ...Field.contextTypes,
    getValidation: PropTypes.func
  };

  renderValidation(name) {
    const validation = this.context.getValidation(name);
    return (
      <p className={classNames('help', validation && 'is-' + validation.type)}>
        {validation && validation.message}
      </p>
    );
  }
}

export default ValidationField;
