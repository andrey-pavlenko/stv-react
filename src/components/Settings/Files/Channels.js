import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Ban } from '../../Icons';

class Channels extends Component {
  static contextTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    channels: PropTypes.object
  };

  state = {
    renaming: ''
  };

  getChannelName = id => this.context.data.get('renameChannels')[id];

  handleRenameKeyDown = (event, id) => {
    switch (event.keyCode) {
    case 13: {
      event.preventDefault();
      const newName = event.target.value.trim();
      if (newName) {
        const { data, setData } = this.context;
        setData('renameChannels', {
          ...data.get('renameChannels'),
          [id]: newName
        });
        console.info('rename', id, newName);
      }
      this.setState({ renaming: '' });
      break;
    }
    case 27:
      event.preventDefault();
      this.setState({ renaming: '' });
      break;
    default:
      break;
    }
  };

  // TODO: Resize and modfy Cancel raname icon
  renderRenaming = (id, name) => (
    <td colSpan="3">
      <div className="field has-addons">
        <p className="control">
          <a className="button is-static is-small">{id}</a>
        </p>
        <div className="control is-expanded has-icons-right">
          <input
            className="input is-fullwidth is-small"
            type="text"
            autoFocus
            placeholder={name}
            defaultValue={this.getChannelName(id) || name}
            onKeyDown={event => this.handleRenameKeyDown(event, id)}
            onBlur={() => this.setState({ renaming: '' })}
          />
          <Ban
            className="icon is-small is-right"
            title="Отменить переименование"
          />
        </div>
      </div>
    </td>
  );

  handleToggleChannel = (event, id) => {
    const { data, setData } = this.context;
    if (event.target.checked) {
      setData('hiddenChannels', [...data.get('hiddenChannels'), id]);
    } else {
      setData(
        'hiddenChannels',
        data.get('hiddenChannels').filter(i => i !== id)
      );
    }
  };

  renderCheckable = (id, name) => {
    const { data } = this.context;
    return (
      <Fragment>
        <td className="has-text-centered">
          <input
            type="checkbox"
            checked={data.get('hiddenChannels').includes(id)}
            onChange={event => this.handleToggleChannel(event, id)}
          />
        </td>
        <td>
          {this.getChannelName(id) || name}&nbsp;
          <code>{id}</code>
        </td>
        <td>
          <button
            className="button is-small"
            onClick={() => this.setState({ renaming: id })}
          >
            Переименовать
          </button>
        </td>
      </Fragment>
    );
  };

  render() {
    const { channels } = this.context;

    if (channels.size === 0) {
      return null;
    }

    // TODO: style width, margin-bottom
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Каналы</p>
        </header>
        <div className="card-content">
          <table
            className="table is-hoverable is-fullwidth"
            style={{ marginBottom: 0 }}
          >
            <thead>
              <tr>
                <th>Скрыть</th>
                <th style={{ width: '100%' }}>Канал</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {channels
                .map((value, key) => (
                  <tr key={key}>
                    {this.state.renaming === key
                      ? this.renderRenaming(key, value)
                      : this.renderCheckable(key, value)}
                  </tr>
                ))
                .toArray()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Channels;
