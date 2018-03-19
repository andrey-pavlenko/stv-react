import React, { PureComponent } from 'react';

class Channels extends PureComponent {
  render() {
    const channels = {
      RTR: 'Россия 1',
      STS: 'СТС',
      '1TV': 'Первый'
    };

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
              {Object.keys(channels).map(key => (
                <tr key="key">
                  <td className="has-text-centered">
                    <input type="checkbox" />
                  </td>
                  <td>
                    {channels[key]}&nbsp;
                    <code>{key}</code>
                  </td>
                  <td>
                    <a className="button is-small">Переименовать</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Channels;
