import React, { Fragment, PureComponent } from 'react';
import classNames from 'classnames';

import Navbar from './Navbar';
import Server from './Server';
import Files from './Files';

class Settings extends PureComponent {
  state = {
    tab: 'server',
    tabs: {
      server: Server,
      files: Files
    }
  };

  render() {
    const TabComponent =
      this.state.tabs[this.state.tab] || this.state.tabs['server'];

    const handleTabClick = event => {
      event.preventDefault();
      this.setState({ tab: event.target.name });
    };

    return (
      <Fragment>
        <Navbar />
        <div className="container">
          <div className="tabs">
            <ul>
              <li
                className={classNames({
                  'is-active': this.state.tab === 'server'
                })}
              >
                <a name="server" onClick={handleTabClick}>
                  Сервер
                </a>
              </li>
              <li
                className={classNames({
                  'is-active': this.state.tab === 'files'
                })}
              >
                <a name="files" onClick={handleTabClick}>
                  Файлы
                </a>
              </li>
            </ul>
          </div>
          <TabComponent />
        </div>
      </Fragment>
    );
  }
}

export default Settings;
