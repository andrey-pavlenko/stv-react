import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Times } from '../Icons';

const RenameChannel = props => {
  const {
    name,
    id,
    placeholder,
    handleKeyEnter,
    handleKeyEsc,
    handleBlur,
    handleRestore,
    isSmall
  } = props;

  const handleKeyDown = event => {
    switch (event.keyCode) {
    case 13:
      event.preventDefault();
      handleKeyEnter(event.target.value.trim());
      break;
    case 27:
      event.preventDefault();
      handleKeyEsc();
      break;
    default:
      break;
    }
  };

  const handleComponentBlur = event => {
    const currentTarget = event.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        handleBlur();
      }
    }, 0);
  };

  // TODO: Change Ban icon to Restore
  return (
    <div
      className="rename-channel field has-addons"
      tabIndex="-1"
      onBlur={handleComponentBlur}
    >
      <p className="control">
        <a className={classNames('button is-static', { 'is-small': isSmall })}>
          {id}
        </a>
      </p>
      <div className="control is-expanded">
        <input
          className={classNames('input is-fullwidth', {
            'is-small': isSmall
          })}
          type="text"
          autoFocus
          placeholder={placeholder || name}
          defaultValue={name}
          onKeyDown={handleKeyDown}
        />
      </div>
      <p className="control">
        <a
          className={classNames('button is-primary', { 'is-small': isSmall })}
          onClick={handleRestore}
        >
          <Times className="icon" title="Отменить переименование" />
        </a>
      </p>
    </div>
  );
};

RenameChannel.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleKeyEnter: PropTypes.func,
  handleKeyEsc: PropTypes.func,
  handleBlur: PropTypes.func,
  handleRestore: PropTypes.func,
  isSmall: PropTypes.bool
};

RenameChannel.defaultProps = {
  handleKeyEnter: () => {},
  handleKeyEsc: () => {},
  handleBlur: () => {},
  handleRestore: () => {},
  isSmall: false
};

export default RenameChannel;
