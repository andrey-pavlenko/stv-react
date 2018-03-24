import React, { PureComponent, Fragment } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { Check, Ban } from '../Icons';

import { notifications } from '../Notifications';

class Navbar extends PureComponent {
  state = {
    isActive: false
  };

  handleSave = event => {
    event.preventDefault();
    // console.info('handleSave', notifications);
    notifications.addNotification({
      type: 'primary',
      content: (
        <Fragment>
          <p>Проверка уведомлений</p>
          <p>
            <b>Новая срока</b>
          </p>
        </Fragment>
      )
    });
  };

  handleCancel = event => {
    event.preventDefault();
    console.info('handleCancel');
  };

  render() {
    return (
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <p className="navbar-item navbar__title">Настройки</p>
          <p
            className={classNames('navbar-burger', {
              'is-active': this.state.isActive
            })}
            onClick={() => this.setState({ isActive: !this.state.isActive })}
          >
            <span />
            <span />
            <span />
          </p>
        </div>
        <div
          className={classNames('navbar-menu', {
            'is-active': this.state.isActive
          })}
        >
          <div className="navbar-end">
            <a
              className="navbar-item"
              disabled={this.props.hasError()}
              onClick={this.handleSave}
            >
              <Check className="icon" />&nbsp;Сохранить
            </a>
            <a className="navbar-item" onClick={this.handleCancel}>
              <Ban className="icon" />&nbsp;Отмена
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
