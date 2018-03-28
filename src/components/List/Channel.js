import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Window, ArrowDownBoxOutline } from '../Icons';
import { time as formatTime } from '../../modules/format';
import {
  getViewedUrlIds,
  getDownloadedUrlIds,
  getChannelName,
  getSettings
} from '../../store/selectors';
import {
  settingsRenameChannel,
  settingsRestoreChannelName,
  settingsHideChannel
} from '../../store/actions';
import RenameChannel from '../Settings/RenameChannel';

class Channel extends PureComponent {
  static propTypes = {
    files: PropTypes.instanceOf(List)
  };

  state = {
    isRenaming: false
  };

  renderHeader() {
    const { id, name } = this.props.files.first();
    const newName = getChannelName(id) || name;
    const handleRename = newName => {
      newName = newName.trim();
      if (newName) {
        this.props.renameChannel(id, newName);
        this.setState({ isRenaming: false });
      }
    };
    const handleRestore = () => {
      this.props.restoreName(id);
      this.setState({ isRenaming: false });
    };
    const handleCancel = () => this.setState({ isRenaming: false });

    return (
      <header className="card-header">
        {this.state.isRenaming ? (
          <div className="card-header-title">
            <RenameChannel
              id={id}
              name={newName}
              placeholder={name}
              handleKeyEnter={handleRename}
              handleKeyEsc={handleCancel}
              handleBlur={handleCancel}
              handleRestore={handleRestore}
              isSmall={false}
              hasRestore={name !== newName}
            />
          </div>
        ) : (
          <Fragment>
            <p className="card-header-title is-size-4">{newName}</p>
            <p className="card-header-icon">
              <span className="tag is-info">{id}</span>
            </p>
          </Fragment>
        )}
      </header>
    );
  }

  renderFileItem(item) {
    const { time, timeshift, type, variant, urlId } = item;
    return (
      <tr key={urlId}>
        <td className="is-narrow">
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
        </td>
        <td className="is-fullwidth">
          <Link to={`/file/${urlId}`}>
            <span>{variant}</span>
          </Link>
          {type && <code>{type}</code>}
        </td>
        <td>
          {timeshift > 0 && (
            <span className="tag is-info" title="Часовой пояс">
              {timeshift > 0 ? '+' + timeshift : timeshift}
            </span>
          )}
        </td>
        <td className="is-narrow">
          <small className="has-text-grey-light">{formatTime(time)}</small>
        </td>
      </tr>
    );
  }

  render() {
    this.renderHeader();
    return (
      <div className="card channel-list__item">
        {this.renderHeader()}
        <div className="card-content">
          <table className="table is-striped is-fullwidth is-hoverable">
            <tbody>
              {this.props.files.map(
                item =>
                  !this.props.settings
                    .get('hiddenVariants')
                    .includes(item.variant) && this.renderFileItem(item)
              )}
            </tbody>
          </table>
        </div>
        <footer className="card-footer">
          <div className="card-footer-item field is-grouped">
            <div className="control">
              <button
                className="button is-small"
                disabled={this.state.isRenaming}
                onClick={() => this.setState({ isRenaming: true })}
              >
                Переменовать
              </button>
            </div>
            <div className="control">
              <button
                className="button is-small"
                onClick={() =>
                  this.props.hideChannel(this.props.files.first().id)
                }
              >
                Скрыть
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  viewedUrlIds: getViewedUrlIds(state),
  downloadedUrlIds: getDownloadedUrlIds(state),
  settings: getSettings(state)
});

const mapDispatchToProps = dispatch => ({
  renameChannel: (id, newName) => dispatch(settingsRenameChannel(id, newName)),
  hideChannel: id => dispatch(settingsHideChannel(id)),
  restoreName: id => dispatch(settingsRestoreChannelName(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
