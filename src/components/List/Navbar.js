import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Set } from 'immutable';
import { Link } from 'react-router-dom';

import { Settings, Renew } from '../Icons';
import { getWeeks, getCurrentWeek } from '../../store/selectors';
import { setCurrentWeek } from '../../store/actions';
import { week as formatWeek } from '../../modules/format';

class WeeksDropdown extends PureComponent {
  static propTypes = {
    weeks: PropTypes.instanceOf(Set).isRequired,
    current: PropTypes.number.isRequired,
    setCurrentWeek: PropTypes.func.isRequired
  };

  dropdown = null;

  state = {
    isOpen: false
  };

  handleOpen = event => {
    event.preventDefault();
    this.setState({ isOpen: true });
  };

  handleClose = event => {
    event.preventDefault();
    this.dropdown.blur();
    this.setState({ isOpen: false });
  };

  render() {
    const { current, weeks, setCurrentWeek } = this.props;
    return (
      <div
        ref={el => {
          this.dropdown = el;
        }}
        tabIndex="-1"
        className={classNames('navbar-item has-dropdown', {
          'is-active': this.state.isOpen
        })}
        onFocus={this.handleOpen}
        onBlur={this.handleClose}
      >
        <a className="navbar-link">
          {current > 0 ? formatWeek(current) : 'Не выбрано'}
        </a>
        <div className="navbar-dropdown is-boxed">
          {weeks.map(week => (
            <a
              key={week}
              className={classNames('navbar-item', {
                'is-active': current === week
              })}
              onClick={event => {
                setCurrentWeek(week);
                this.handleClose(event);
              }}
            >
              {formatWeek(week)}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

class Navbar extends PureComponent {
  state = {
    isLoading: false,
    isActive: false
  };

  render() {
    return (
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <p
            className={classNames('navbar-item navbar__title_loading', {
              'is-loading': this.state.isLoading
            })}
          >
            Список
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
          {this.props.weeks.size > 0 && (
            <div className="navbar-start">
              <WeeksDropdown
                weeks={this.props.weeks}
                current={this.props.currentWeek}
                setCurrentWeek={this.props.setCurrentWeek}
              />
            </div>
          )}
          <div className="navbar-end">
            <a className="navbar-item">
              <Renew className="icon" />&nbsp;Обновить
            </a>
            <Link to="/settings" className="navbar-item">
              <Settings className="icon" />&nbsp;Настройки
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  weeks: getWeeks(state),
  currentWeek: getCurrentWeek(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentWeek: week => dispatch(setCurrentWeek(week))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
