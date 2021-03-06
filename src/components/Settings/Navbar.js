import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Check, Ban } from '../Icons';

class Navbar extends PureComponent {
  state = {
    isActive: false
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
              disabled={this.props.hasError}
              onClick={event => {
                event.preventDefault();
                this.props.handleSave();
              }}
            >
              <Check className="icon" />&nbsp;Сохранить
            </a>
            <Link
              to="/"
              className="navbar-item"
              disabled={!this.props.canCancel}
            >
              <Ban className="icon" />&nbsp;Отмена
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
