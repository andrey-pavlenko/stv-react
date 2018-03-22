import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Window, ArrowDownBoxOutline } from '../Icons';
import { time as formatTime } from '../../modules/format';
import { getViewedUrlIds, getDownloadedUrlIds } from '../../store/selectors';

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
          <Window
            title="Просмотрен"
            className={classNames(
              'icon is-small',
              this.props.viewedUrlIds.includes(urlId)
                ? 'has-text-primary'
                : 'has-text-grey-light'
            )}
          />
          <ArrowDownBoxOutline
            title="Загружен"
            className={classNames(
              'icon is-small',
              this.props.downloadedUrlIds.includes(urlId)
                ? 'has-text-primary'
                : 'has-text-grey-light'
            )}
          />
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

const mapStateToProps = state => ({
  viewedUrlIds: getViewedUrlIds(state),
  downloadedUrlIds: getDownloadedUrlIds(state)
});

export default connect(mapStateToProps)(Channel);
