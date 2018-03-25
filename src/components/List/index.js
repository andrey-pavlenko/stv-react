import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';
import Channel from './Channel';

import { getCurrentWeekFileItems, getSettings } from '../../store/selectors';
import { filesRequest } from '../../store/actions';

class ChannelsList extends PureComponent {
  componentWillMount() {
    if (
      this.props.settings.get('url') &&
      this.props.settings.get('login') &&
      this.props.items.size === 0
    ) {
      this.props.filesRequest();
    }
  }

  // TODO: Goto Settings if no url and login
  render() {
    if (!this.props.settings.get('url') || !this.props.settings.get('login')) {
      return <Redirect to="/settings" />;
    }

    return (
      <Fragment>
        <Navbar />
        <div className="container">
          {this.props.items.size > 0 ? (
            this.props.items
              .groupBy(item => item.id)
              .map(
                (files, id) =>
                  !this.props.settings.get('hiddenChannels').includes(id) && (
                    <Channel key={id} files={files} />
                  )
              )
              .toArray()
          ) : (
            <div className="center-screen is-size-2 has-text-grey-lighter">
              Нет файлов
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  items: getCurrentWeekFileItems(state),
  settings: getSettings(state)
});

const mapDispatchToProps = dispatch => ({
  filesRequest: () => dispatch(filesRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList);
