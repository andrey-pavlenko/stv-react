import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Link } from 'react-router-dom';

import { Window, ArrowDownBoxOutline } from '../Icons';
import { time as formatTime } from '../../modules/format';

class Channel extends PureComponent {
  static propTypes = {
    files: PropTypes.instanceOf(List)
  };

  renderHeader() {
    const { id, name } = this.props.files.first();
    return (
      <header className="card-header">
        <p className="card-header-title is-size-4">{name}</p>
        <p className="card-header-icon">
          <span className="tag is-info">{id}</span>
        </p>
      </header>
    );
  }

  renderFileItem(item) {
    const { time, timeshift, type, variant, urlId } = item;
    return (
      <li key={urlId}>
        <span>
          <Window className="icon is-small has-text-grey-light" />
          <ArrowDownBoxOutline className="icon is-small has-text-grey-light" />
        </span>
        <Link to={`/file/${urlId}`}>
          <span>{variant}</span>
        </Link>
        {type && <code>{type}</code>}
        <span>{timeshift}</span>
        <small className="has-text-grey-light">{formatTime(time)}</small>
      </li>
    );
  }

  render() {
    this.renderHeader();
    return (
      <div className="card">
        {this.renderHeader()}
        <ul className="card-content">
          {this.props.files.map(item => this.renderFileItem(item))}
        </ul>
        <footer className="card-footer">
          <div className="card-footer-item field is-grouped">
            <div className="control">
              <button className="button is-small">Переменовать</button>
            </div>
            <div className="control">
              <button className="button is-small">Скрыть</button>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Channel;
