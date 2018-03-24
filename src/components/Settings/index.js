import React, { Fragment, PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { connect } from 'react-redux';

import { getSettings, getFileItems } from '../../store/selectors';

import { validate, hasError } from './validate';

import Navbar from './Navbar';
import Server from './Server';
import Files from './Files';

class Settings extends PureComponent {
  state = {
    data: Map(this.props.settings),
    tab: 'files',
    tabs: {
      server: Server,
      files: Files
    }
  };

  // Context ==============================================

  static childContextTypes = {
    data: PropTypes.instanceOf(Map),
    getValidation: PropTypes.func,
    setData: PropTypes.func,
    setDataCallback: PropTypes.func
  };

  getChildContext() {
    return {
      data: this.state.data,
      getValidation: this.getValidation,
      setData: this.setData,
      setDataCallback: this.setDataCallback
    };
  }

  setData = (name, value) =>
    this.setState({ data: this.state.data.set(name, value) });

  setDataCallback = updater =>
    this.setState((prevState, props) => ({
      data: updater(prevState.data, props.settings)
    }));

  getValidation = name => validate(this.state.data, name);

  // ======================================================

  render() {
    const TabComponent =
      this.state.tabs[this.state.tab] || this.state.tabs['server'];

    const handleTabClick = event => {
      event.preventDefault();
      this.setState({ tab: event.target.name });
    };

    return (
      <Fragment>
        <Navbar hasError={() => hasError(this.state.data)} />
        <div className="container">
          <div className="tabs">
            <ul>
              <li
                className={classNames({
                  'is-active': this.state.tab === 'server'
                })}
              >
                <a name="server" onClick={handleTabClick}>
                  Сервер
                </a>
              </li>
              <li
                className={classNames({
                  'is-active': this.state.tab === 'files'
                })}
              >
                <a name="files" onClick={handleTabClick}>
                  Файлы
                </a>
              </li>
            </ul>
          </div>
          <TabComponent />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  settings: getSettings(state),
  items: getFileItems(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
