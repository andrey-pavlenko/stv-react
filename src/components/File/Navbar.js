import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// TODO: Rename icons
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
            <span>{this.props.name}</span>&emsp;
            <span className="tag is-primary navbar__id-tag">
              {this.props.id}
            </span>
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
            <Link to="/" className="navbar-item">
              На главную
            </Link>
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
