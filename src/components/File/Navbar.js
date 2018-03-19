import React, { PureComponent } from 'react';
import classNames from 'classnames';

import { ArrowDownBoxOutline } from '../Icons';

class Navbar extends PureComponent {
  state = {
    isActive: false
  };

  render() {
    return (
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <p className="navbar-item navbar__title">
            <span>Россия 1</span>&emsp;
            <span className="tag is-primary navbar__id-tag">RTR</span>
          </p>
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
            <a className="navbar-item">На главную</a>
            <a className="navbar-item">
              <ArrowDownBoxOutline className="icon" />&nbsp;Загрузить
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
