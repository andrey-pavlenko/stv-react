import React, { Fragment, PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Map, OrderedSet, OrderedMap } from 'immutable';
import { connect } from 'react-redux';

import { getSettings, getFileItems } from '../../store/selectors';
import { settingsSave } from '../../store/actions';
import { validate, hasError } from './validate';

import Navbar from './Navbar';
import Server from './Server';
import Files from './Files';

class Settings extends PureComponent {
  state = {
    data: Map(this.props.settings),
    tab: 'server',
    tabs: {
      server: Server,
      files: Files
    },
    isSaved: false
  };

  // Context ==============================================

  static childContextTypes = {
    data: PropTypes.instanceOf(Map),
    getValidation: PropTypes.func,
    setData: PropTypes.func,
    setDataCallback: PropTypes.func,
    variants: PropTypes.instanceOf(OrderedSet),
    channels: PropTypes.instanceOf(OrderedMap)
  };

  getChildContext() {
    return {
      data: this.state.data,
      getValidation: this.getValidation,
      setData: this.setData,
      setDataCallback: this.setDataCallback,
      variants: this.variants,
      channels: this.channels
    };
  }

  setData = (name, value) =>
    this.setState({ data: this.state.data.set(name, value) });

  setDataCallback = updater =>
    this.setState((prevState, props) => ({
      data: updater(prevState.data, props.settings)
    }));

  getValidation = name => validate(this.state.data, name);

  variants = OrderedSet(
    this.props.items
      .map(item => item.variant)
      .concat(this.props.settings.get('hiddenVariants'))
      .sort()
  );

  channels = OrderedMap(this.props.items.map(item => [item.id, item.name]))
    .merge(this.props.settings.get('renameChannels'))
    .sortBy((value, key) => value.toLocaleLowerCase());

  // ======================================================

  render() {
    if (this.state.isSaved) {
      return <Redirect to="/" />;
    }

    const TabComponent =
      this.state.tabs[this.state.tab] || this.state.tabs['server'];

    const handleTabClick = event => {
      event.preventDefault();
      this.setState({ tab: event.target.name });
    };

    return (
      <Fragment>
        <Navbar
          hasError={hasError(this.state.data)}
          canCancel={
            !!this.props.settings.get('url') &&
            !!this.props.settings.get('login')
          }
          handleSave={() => {
            this.props.settingsSave(this.state.data);
            this.setState({ isSaved: true });
          }}
        />
        <div className="container settings">
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
                <a
                  name="files"
                  onClick={handleTabClick}
                  disabled={!this.variants.size || !this.channels.size}
                >
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

const mapDispatchToProps = dispatch => ({
  settingsSave: data => dispatch(settingsSave(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
